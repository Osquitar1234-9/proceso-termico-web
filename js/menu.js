document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  const icon = menuToggle?.querySelector('.menu-icon');

  // Si no existen los elementos necesarios, salir
  if (!menuToggle || !nav || !icon) {
    console.error('Elementos del menú no encontrados');
    return;
  }

  /**
   * Función para abrir/cerrar el menú
   * @param {boolean} isOpen - Indica si el menú debe abrirse (true) o cerrarse (false)
   */
  const toggleMenu = (isOpen) => {
    nav.classList.toggle('open', isOpen); // aquí el cambio importante
    icon.textContent = isOpen ? '✕' : '☰';
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
    document.querySelector('.site-header')?.classList.toggle('menu-open', isOpen);
  };

  const closeMenu = () => {
    toggleMenu(false);
  };

  const handleClickOutside = (event) => {
    if (nav.classList.contains('open') &&
        !nav.contains(event.target) &&
        event.target !== menuToggle) {
      closeMenu();
    }
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('open');
    toggleMenu(isOpen);
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });

  document.addEventListener('click', handleClickOutside);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('open')) {
      closeMenu();
    }
  });
});

