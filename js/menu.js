document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const icon = toggleBtn?.querySelector('.menu-icon');

  if (!toggleBtn || !nav || !icon) {
    console.warn('Menú hamburguesa: elementos no encontrados.');
    return;
  }

  const openMenu = () => {
    nav.classList.add('open');
    document.body.classList.add('menu-open');
    icon.textContent = '✕';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    icon.textContent = '☰';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cierra al hacer clic en cualquier link del menú (solo en móviles)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Cierra con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
});

