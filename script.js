(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const menuButton = $('.menu-button');
  const mobileMenu = $('#mobile-menu');
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
  }
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  });
  $$('#mobile-menu a').forEach((a) => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  // All opening-hour calculations are based on the shop's timezone, not the visitor's.
  function setOpeningStatus() {
    const el = $('#open-status');
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      const get = (type) => parts.find(p => p.type === type)?.value || '';
      const day = get('weekday');
      const mins = Number(get('hour')) * 60 + Number(get('minute'));
      const hours = {Mon:[540,1140],Tue:[540,1140],Wed:[540,1140],Thu:[540,1140],Fri:[480,1140],Sat:[420,1080],Sun:[510,1020]};
      const entry = hours[day];
      const isOpen = Boolean(entry && mins >= entry[0] && mins < entry[1]);
      el.classList.remove('open', 'closed');
      el.classList.add(isOpen ? 'open' : 'closed');
      el.innerHTML = '<span class="status-dot"></span> ' + (isOpen ? 'SCHEDULED OPEN NOW' : 'CURRENTLY OUTSIDE PUBLISHED HOURS');
      el.title = 'Based on published hours and the current time in Preston. Temporary closures and public holidays may vary.';
    } catch (err) {
      el.innerHTML = '<span class="status-dot"></span> CALL TO CHECK TODAY’S HOURS';
    }
  }
  setOpeningStatus();
  // Refresh only while the page is open.
  setInterval(setOpeningStatus, 60 * 1000);
  $('#year').textContent = String(new Date().getFullYear());

  const lightbox = $('#lightbox');
  const lightboxImage = $('#lightbox-img');
  $$('.gallery-item').forEach(item => item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.dataset.alt || 'Barbershop photography';
    if (typeof lightbox.showModal === 'function') lightbox.showModal();
    else lightbox.setAttribute('open', '');
    document.body.classList.add('modal-open');
  }));
  function closeLightbox() { lightbox.close ? lightbox.close() : lightbox.removeAttribute('open'); document.body.classList.remove('modal-open'); lightboxImage.removeAttribute('src'); }
  $('#lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
  lightbox.addEventListener('close', () => document.body.classList.remove('modal-open'));

  const bookingForm = $('#request-form');
  const requestPreview = $('#request-preview');
  const bookingService = $('#booking-service');
  const dateInput = $('#booking-date');
  const todayLocal = () => {
    const now = new Date();
    // Use UK date for visit date validation.
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  };
  // en-CA can differ among browsers; prefer formatToParts to guarantee YYYY-MM-DD.
  const ukToday = () => {
    const p = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/London',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const v = type => p.find(x => x.type === type)?.value || '';
    return `${v('year')}-${v('month')}-${v('day')}`;
  };
  dateInput.min = ukToday();

  $$('[data-service]').forEach(link => link.addEventListener('click', () => {
    const value = link.dataset.service;
    if ([...bookingService.options].some(option => option.value === value)) bookingService.value = value;
    bookingForm.hidden = false;
    requestPreview.hidden = true;
  }));
  let prepared = '';
  let toastTimer;
  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3600);
  }
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    dateInput.min = ukToday();
    if (!bookingForm.reportValidity()) return;
    const data = new FormData(bookingForm);
    if (String(data.get('date')) < dateInput.min) { dateInput.setCustomValidity('Please choose today or a future date.'); dateInput.reportValidity(); return; }
    const rawDate = String(data.get('date'));
    const [yr, mo, day] = rawDate.split('-');
    const humanDate = `${day}/${mo}/${yr}`;
    const [hour, minute] = String(data.get('time')).split(':').map(Number);
    const weekday = new Date(`${rawDate}T12:00:00Z`).getUTCDay();
    const hours = [[510,1020],[540,1140],[540,1140],[540,1140],[540,1140],[480,1140],[420,1080]];
    const wanted = hour*60+minute;
    if (wanted < hours[weekday][0] || wanted >= hours[weekday][1]) {
      toast('That time is outside the published opening hours. Please choose another time.');
      return;
    }
    const name = String(data.get('name')).trim();
    const phone = String(data.get('phone')).trim();
    const service = String(data.get('service'));
    const notes = String(data.get('notes')).trim();
    prepared = `Hello Royal Barber Shop,\n\nI'd like to enquire about an appointment.\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred date: ${humanDate}\nPreferred time: ${String(data.get('time'))} (UK time)\n${notes ? 'Notes: '+notes+'\n':''}\nPlease let me know if this time is available. I understand this is an enquiry, not a confirmed booking.\n\nThank you!`;
    const subject = `Booking enquiry — ${service} — ${humanDate}`;
    $('#send-request').href = `mailto:barberroyal8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(prepared)}`;
    bookingForm.hidden = true;
    requestPreview.hidden = false;
    requestPreview.scrollIntoView({behavior:'smooth',block:'center'});
  });
  dateInput.addEventListener('change', () => dateInput.setCustomValidity(''));
  $('#copy-request').addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(prepared);
      else {
        const temp = document.createElement('textarea');
        temp.value = prepared; temp.style.position = 'fixed'; temp.style.top = '-1000px';
        document.body.appendChild(temp); temp.select();
        const copied = document.execCommand('copy'); temp.remove();
        if (!copied) throw new Error('Copy unavailable');
      }
      toast('Enquiry copied. You can send it to the shop.');
    } catch (e) {
      toast('Please use the email button, or call the shop instead.');
    }
  });
  $('#edit-request').addEventListener('click', () => {
    requestPreview.hidden = true;
    bookingForm.hidden = false;
    bookingForm.scrollIntoView({behavior:'smooth',block:'center'});
  });
})();
