const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { 
    if (entry.isIntersecting) entry.target.classList.add('visible'); 
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));

// Video play/pause handler
document.querySelectorAll('.project').forEach((card) => {
  const btn = card.querySelector('.play');
  const video = card.querySelector('.edit-video');

  if (!btn || !video) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Pause any other playing video
    document.querySelectorAll('.project.is-playing').forEach((activeCard) => {
      if (activeCard !== card) {
        const otherVideo = activeCard.querySelector('.edit-video');
        if (otherVideo) {
          otherVideo.pause();
          otherVideo.controls = false;
        }
        activeCard.classList.remove('is-playing');
      }
    });

    // Play current video
    card.classList.add('is-playing');
    video.controls = true;
    video.play();
  });

  video.addEventListener('ended', () => {
    card.classList.remove('is-playing');
    video.controls = false;
  });
});