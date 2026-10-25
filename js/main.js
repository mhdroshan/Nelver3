/**
 * NELVÉR III — Atelier Haute Couture
 * Minimal Clean E-Commerce Interaction System
 * Features: Background Parallax, Bespoke Cursor, 3D Micro-Perspective Tilt
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundMotion();
  initMouseFollower();
  initCardTilt();
});

/**
 * Architectural Concentric Rings Subtle Micro-Parallax
 */
function initBackgroundMotion() {
  const ringsSvg = document.querySelector('.architectural-rings-svg');
  if (!ringsSvg) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX = (e.clientX / innerWidth - 0.5) * 20;
    mouseY = (e.clientY / innerHeight - 0.5) * 20;
  }, { passive: true });

  function renderParallax() {
    currentX += (mouseX - currentX) * 0.04;
    currentY += (mouseY - currentY) * 0.04;

    ringsSvg.style.transform = `translate(calc(-50% + ${currentX.toFixed(2)}px), calc(-50% + ${currentY.toFixed(2)}px))`;
    requestAnimationFrame(renderParallax);
  }

  requestAnimationFrame(renderParallax);
}

/**
 * Minimal Haute Couture Mouse-Following Animation System
 */
function initMouseFollower() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorFollower = document.getElementById('cursorFollower');
  const cursorSpotlight = document.getElementById('cursorSpotlight');
  if (!cursorDot || !cursorFollower) return;

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isFinePointer || prefersReducedMotion) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let dotX = targetX;
  let dotY = targetY;
  let followerX = targetX;
  let followerY = targetY;
  let spotlightX = targetX;
  let spotlightY = targetY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursorDot.style.opacity = '1';
      cursorFollower.style.opacity = '1';
      if (cursorSpotlight) cursorSpotlight.style.opacity = '1';
    }
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isVisible = false;
    cursorDot.style.opacity = '0';
    cursorFollower.style.opacity = '0';
    if (cursorSpotlight) cursorSpotlight.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    cursorDot.style.opacity = '1';
    cursorFollower.style.opacity = '1';
    if (cursorSpotlight) cursorSpotlight.style.opacity = '1';
  });

  window.addEventListener('mousedown', () => {
    cursorFollower.classList.add('is-clicking');
  });

  window.addEventListener('mouseup', () => {
    cursorFollower.classList.remove('is-clicking');
  });

  // Dynamic hover detection for interactive elements
  const interactiveSelectors = 'a, button, .pillar-card, .nav-contact-link, .liaison-link, .footer-action-link';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursorFollower.classList.add('is-hovering');
      cursorDot.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursorFollower.classList.remove('is-hovering');
      cursorDot.classList.remove('is-hovering');
    }
  });

  function renderCursor() {
    if (isVisible) {
      dotX += (targetX - dotX) * 0.75;
      dotY += (targetY - dotY) * 0.75;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;

      followerX += (targetX - followerX) * 0.16;
      followerY += (targetY - followerY) * 0.16;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;

      if (cursorSpotlight) {
        spotlightX += (targetX - spotlightX) * 0.08;
        spotlightY += (targetY - spotlightY) * 0.08;
        cursorSpotlight.style.left = `${spotlightX}px`;
        cursorSpotlight.style.top = `${spotlightY}px`;
      }
    }

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
}

/**
 * 3D Micro-Perspective Card Tilt for Pillar Cards
 */
function initCardTilt() {
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isFinePointer || prefersReducedMotion) return;

  const tiltCards = document.querySelectorAll('.pillar-card');

  tiltCards.forEach(card => {
    let bounds;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const rotateX = yPct * -5;
      const rotateY = xPct * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}
