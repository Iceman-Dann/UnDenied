// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

// Reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lenis Smooth Scroll
let lenis;
if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Page Visibility API to pause Lenis when hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
}

// Custom Cursor
if (!prefersReducedMotion) {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const ringText = document.createElement('div');
  ringText.classList.add('cursor-ring-text');
  cursorRing.appendChild(ringText);
  const ringDenied = document.createElement('div');
  ringDenied.classList.add('cursor-ring-denied');
  cursorRing.appendChild(ringDenied);

  const xDot = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "power3", xPercent: -50});
  const yDot = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "power3", yPercent: -50});
  const xRing = gsap.quickTo(cursorRing, "x", {duration: 0.5, ease: "power3", xPercent: -50});
  const yRing = gsap.quickTo(cursorRing, "y", {duration: 0.5, ease: "power3", yPercent: -50});

  window.addEventListener("mousemove", (e) => {
    xDot(e.clientX); yDot(e.clientY);
    xRing(e.clientX); yRing(e.clientY);
  });

  // Cursor States
  const interactables = document.querySelectorAll('a, button');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursorDot, {scale: 0, duration: 0.3});
      gsap.to(cursorRing, {scale: 1.8, borderColor: 'var(--brass)', duration: 0.3});
      if(el.classList.contains('document-cta')) {
          gsap.to(cursorRing, {scale: 4, borderColor: 'var(--crimson)', duration: 0.3});
          gsap.to(ringDenied, {opacity: 1, duration: 0.2});
      }
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursorDot, {scale: 1, duration: 0.3});
      gsap.to(cursorRing, {scale: 1, borderColor: 'rgba(154,123,79,0.4)', backgroundColor: 'transparent', duration: 0.3});
      gsap.to(ringDenied, {opacity: 0, duration: 0.2});
    });
  });

  const docCards = document.querySelectorAll('.dt-card');
  docCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(cursorRing, {scale: 3, backgroundColor: 'rgba(154,123,79,0.08)', borderColor: 'rgba(154,123,79,0.4)', duration: 0.3});
      gsap.to(cursorDot, {scale: 0, duration: 0.3});
      ringText.innerText = 'VIEW →';
      gsap.to(ringText, {opacity: 1, duration: 0.2});
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(cursorRing, {scale: 1, backgroundColor: 'transparent', duration: 0.3});
      gsap.to(cursorDot, {scale: 1, duration: 0.3});
      gsap.to(ringText, {opacity: 0, duration: 0.2});
    });
  });

  const heroLetter = document.querySelector('.js-hover-letter');
  if(heroLetter) {
    heroLetter.addEventListener('mouseenter', () => {
        gsap.to(cursorDot, {scale: 0, duration: 0.3});
        gsap.to(cursorRing, {scale: 4, borderColor: 'var(--crimson)', duration: 0.3});
        ringDenied.innerText = 'DENIED';
        gsap.to(ringDenied, {opacity: 1, duration: 0.2});
    });
    heroLetter.addEventListener('mouseleave', () => {
        gsap.to(cursorDot, {scale: 1, duration: 0.3});
        gsap.to(cursorRing, {scale: 1, borderColor: 'rgba(154,123,79,0.4)', duration: 0.3});
        gsap.to(ringDenied, {opacity: 0, duration: 0.2});
    });
  }
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
ScrollTrigger.create({
  start: 'top -60',
  end: 99999,
  toggleClass: {className: 'nav-scrolled', targets: '.navbar'}
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-overlay');
if (hamburger && mobileMenu) {
  let menuOpen = false;
  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      gsap.to('.hamburger .line:nth-child(1)', {y: 7, rotation: 45, duration: 0.3});
      gsap.to('.hamburger .line:nth-child(2)', {opacity: 0, duration: 0.2});
      gsap.to('.hamburger .line:nth-child(3)', {y: -7, rotation: -45, duration: 0.3});
      mobileMenu.classList.add('active');
      gsap.to('.mobile-overlay .nav-link', {y: 0, opacity: 1, stagger: 0.1, delay: 0.2});
      if(lenis) lenis.stop();
    } else {
      gsap.to('.hamburger .line:nth-child(1)', {y: 0, rotation: 0, duration: 0.3});
      gsap.to('.hamburger .line:nth-child(2)', {opacity: 1, duration: 0.3, delay: 0.2});
      gsap.to('.hamburger .line:nth-child(3)', {y: 0, rotation: 0, duration: 0.3});
      gsap.to('.mobile-overlay .nav-link', {y: 20, opacity: 0, stagger: -0.1, duration: 0.2});
      setTimeout(() => mobileMenu.classList.remove('active'), 400);
      if(lenis) lenis.start();
    }
  });
}
