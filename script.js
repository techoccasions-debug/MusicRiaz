 document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const a = q.nextElementSibling;
    const isOpen = a.classList.contains('active');
    document.querySelectorAll('.faq-a').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.faq-q').forEach(el => el.classList.remove('active'));
    if (!isOpen) { a.classList.add('active'); q.classList.add('active'); }
  });
});

    document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const modal = document.createElement('div'); modal.className = 'lightbox';
    modal.innerHTML = `<div class="lb-content">${item.innerHTML}</div><button class="lb-close">&times;</button>`;
    document.body.appendChild(modal);
    modal.querySelector('.lb-close').onclick = () => modal.remove();
    modal.onclick = e => e.target === modal && modal.remove();
  });
});

// ── Navbar ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadowed', window.scrollY > 10);
});

// ── Mobile Drawer ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobile-drawer');
const mobClose = document.getElementById('mob-close');
function openDrawer(){ hamburger.classList.add('open'); drawer.classList.add('open'); document.body.style.overflow='hidden'; }
function closeDrawer(){ hamburger.classList.remove('open'); drawer.classList.remove('open'); document.body.style.overflow=''; }
hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
mobClose.addEventListener('click', closeDrawer);
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeDrawer));

// ── Scroll Reveal ────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── Counter Animation ────────────────────────────────────
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    let start = 0;
    const dur = 1600;
    const step = timestamp => {
      if(!start) start = timestamp;
      const progress = Math.min((timestamp - start) / dur, 1);
      el.textContent = Math.floor(progress * target);
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
    counterObs.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ── Testimonial Carousel ─────────────────────────────────
const track = document.getElementById('testiTrack');
const navContainer = document.getElementById('testiNav');
const cards = track.querySelectorAll('.testi-card');
let current = 0;
let perView = window.innerWidth <= 768 ? 1 : 2;
const total = Math.ceil(cards.length / perView);

// Build dots
for(let i = 0; i < total; i++){
  const dot = document.createElement('button');
  dot.className = 'tnav-btn' + (i===0?' active':'');
  dot.addEventListener('click', () => goTo(i));
  navContainer.appendChild(dot);
}

function goTo(idx){
  current = (idx + total) % total;
  const cardW = cards[0].offsetWidth + 20; // gap
  track.style.transform = `translateX(-${current * perView * cardW}px)`;
  navContainer.querySelectorAll('.tnav-btn').forEach((d,i) => d.classList.toggle('active', i===current));
}
document.getElementById('tPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('tNext').addEventListener('click', () => goTo(current + 1));
let autoplay = setInterval(() => goTo(current + 1), 5000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
track.parentElement.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(current+1), 5000); });

// ── Form ─────────────────────────────────────────────────
function sendEnquiry(){
  const n = document.getElementById('fn').value.trim();
  const p = document.getElementById('fp').value.trim();
  const i = document.getElementById('fi').value;
  const m = document.getElementById('fm').value;
  const msg = document.getElementById('fmsg').value.trim();
  if(!n||!p){ alert('Please enter your name and phone number.'); return; }
  const text = `Hi Vikas! 👋\n\nNew Enquiry from Website:\n\nName: ${n}\nPhone: ${p}\nCourse: ${i||'Not specified'}\nMode: ${m||'Not specified'}\nMessage: ${msg||"I'd like to book a free demo class."}`;
  window.open(`https://wa.me/918005632843?text=${encodeURIComponent(text)}`, '_blank');
  document.getElementById('formFields').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
}
function resetEnquiry(){
  ['fn','fp','fmsg'].forEach(id => document.getElementById(id).value='');
  ['fi','fm'].forEach(id => document.getElementById(id).value='');
  document.getElementById('formFields').style.display = 'block';
  document.getElementById('formSuccess').classList.remove('show');
}

// ── Smooth scroll ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){ e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
const tracky = document.querySelector(".google-review-track");
tracky.innerHTML += tracky.innerHTML;
