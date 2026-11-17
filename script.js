document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const el = document.getElementById('typed');
  const words = ['real products', 'live apps', 'ideas that launch'];
  let w = 0, c = 0, del = false;
  function type() {
    const word = words[w];
    el.textContent = word.substring(0, del ? c-- : c++);
    if (!del && c > word.length) { del = true; return setTimeout(type, 1800); }
    if (del && c < 0) { del = false; c = 0; w = (w + 1) % words.length; return setTimeout(type, 300); }
    setTimeout(type, del ? 30 : 70);
  }
  setTimeout(type, 1200);

  // Contact form: opens the visitor's email app with the message filled in
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const msg = document.getElementById('message').value;
    const body = encodeURIComponent(`${msg}\n\nFrom: ${name} (${email})`);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    window.location.href = `mailto:emmaabusinesss@gmail.com?subject=${subject}&body=${body}`;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3500);
    form.reset();
  });
});
