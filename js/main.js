const fvCopy = document.querySelector('.fv-copy');
const contact = document.querySelector('.contact');
const worry = document.querySelector('.worry');
const footer = document.querySelector('.footer');

window.addEventListener('load', () => {
  fvCopy?.classList.add('is-show');
});

if (contact && worry && footer) {
  const setContactHidden = (isHidden) => {
    contact.classList.toggle('is-hidden', isHidden);
    contact.setAttribute('aria-hidden', String(isHidden));
  };

  const updateContact = () => {
    const worryEntered = worry.getBoundingClientRect().top < window.innerHeight;
    const footerReached = footer.getBoundingClientRect().top < window.innerHeight;

    setContactHidden(!worryEntered || footerReached);
  };

  let contactUpdateQueued = false;
  const requestContactUpdate = () => {
    if (contactUpdateQueued) return;

    contactUpdateQueued = true;
    requestAnimationFrame(() => {
      updateContact();
      contactUpdateQueued = false;
    });
  };

  window.addEventListener('load', updateContact);
  window.addEventListener('scroll', requestContactUpdate, { passive: true });
  window.addEventListener('resize', requestContactUpdate);

  document.querySelectorAll('img').forEach((image) => {
    if (!image.complete) {
      image.addEventListener('load', requestContactUpdate, { once: true });
    }
  });

  updateContact();
}

const fadeTargets = document.querySelectorAll(`
  .worry-copy,
  .home-copy,
  .zyumokusou-title,
  .reason-copy,
  .comparison-img,
  .comment-copy,
  .comment-copy-l,
  .attempt-title,
  .attempt-copy,
  .attempt-copy2,
  .massage-title,
  .massage-copy,
  .intoroduce-title,
  .intoroduce-copy,
  .question-answer,
  .finish-title,
  .finish_04-txt
`);

fadeTargets.forEach((target) => {
  target.classList.add('fade-up');
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-show');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -10%'
  });

  fadeTargets.forEach((target) => {
    observer.observe(target);
  });
} else {
  const showTargets = () => {
    fadeTargets.forEach((target) => {
      if (target.classList.contains('is-show')) return;

      if (target.getBoundingClientRect().top < window.innerHeight * 0.9) {
        target.classList.add('is-show');
      }
    });
  };

  const requestShowTargets = () => {
    requestAnimationFrame(showTargets);
  };

  window.addEventListener('load', showTargets);
  window.addEventListener('scroll', requestShowTargets, { passive: true });
  window.addEventListener('resize', requestShowTargets);

  document.querySelectorAll('img').forEach((image) => {
    if (!image.complete) {
      image.addEventListener('load', requestShowTargets, { once: true });
    }
  });

  showTargets();
}
