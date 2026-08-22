const fvCopy = document.querySelector('.fv-copy');

window.addEventListener('load', () => {
  fvCopy?.classList.add('is-show');
});

const fadeTargets = document.querySelectorAll(`
  .worry-copy,
  .home-copy,
  .reason-copy,
  .comment-copy,
  .comment-copy-l,
  .attempt-title,
  .attempt-copy,
  .massage-title,
  .massage-copy,
  .intoroduce-title,
  .question-answer,
  .finish-title,
  .finish_04-txt
`);

fadeTargets.forEach((target) => {
  target.classList.add('fade-up');
});

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
