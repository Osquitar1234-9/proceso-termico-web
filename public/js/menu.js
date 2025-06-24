// public/js/menu.js

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const icon = menuToggle.querySelector('.menu-icon');

  if (!menuToggle || !nav || !icon) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');

    icon.textContent = isOpen ? '✕' : '☰';
    menuToggle.setAttribute('aria-expanded', isOpen.toString());

    // Evita scroll en fondo cuando está abierto
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cierra el menú al hacer clic en cualquier enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      icon.textContent = '☰';
      document.body.style.overflow = '';
    });
  });

  // Cierra con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
      icon.textContent = '☰';
      document.body.style.overflow = '';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
