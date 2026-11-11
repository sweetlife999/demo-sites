(() => {
  const progress = document.getElementById('progress');
  const article = document.querySelector('.article');
  const links = [...document.querySelectorAll('.toc a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const start = article.offsetTop - 120;
    const total = article.offsetHeight - window.innerHeight + 240;
    const p = Math.min(1, Math.max(0, (window.scrollY - start) / total));
    progress.style.width = (p * 100).toFixed(2) + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = '#' + e.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    sections.forEach(s => io.observe(s));
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      ev.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
