// ===== LUCIDE ICONS =====
lucide.createIcons();

// ===== SET CURRENT YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MOBILE MENU TOGGLE =====
const toggle = document.getElementById('mobileMenuToggle');
const menu = document.getElementById('mobileMenu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// ===== SMOOTH SCROLL (optional enhancement) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== WHATSAPP NUMBER PLACEHOLDER (find/replace this) =====
// Search for: 2348000000000
// Replace with your actual WhatsApp number in format: 234XXXXXXXXX