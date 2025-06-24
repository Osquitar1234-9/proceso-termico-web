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
    // Alternar clase 'active' en el menú
    nav.classList.toggle('active', isOpen);
    
    // Cambiar icono (hamburguesa o X)
    icon.textContent = isOpen ? '✕' : '☰';
    
    // Actualizar atributo ARIA para accesibilidad
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    
    // Bloquear/desbloquear scroll del body
    document.body.style.overflow = isOpen ? 'hidden' : '';
    
    // Opcional: agregar clase al header cuando el menú está abierto
    document.querySelector('.site-header')?.classList.toggle('menu-open', isOpen);
  };

  /**
   * Función para cerrar el menú
   */
  const closeMenu = () => {
    toggleMenu(false);
  };

  /**
   * Función para verificar si un clic ocurrió fuera del menú
   * @param {Event} event - El evento de clic
   */
  const handleClickOutside = (event) => {
    if (nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        event.target !== menuToggle) {
      closeMenu();
    }
  };

  // Evento para abrir/cerrar el menú al hacer clic en el botón
  menuToggle.addEventListener('click', () => {
    const isOpen = !nav.classList.contains('active');
    toggleMenu(isOpen);
  });

  // Cerrar menú al hacer clic en cualquier enlace del menú
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Cerrar menú al hacer clic fuera de él
  document.addEventListener('click', handleClickOutside);

  // Cerrar menú al cambiar el tamaño de la ventana (si se cambia a desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      closeMenu();
    }
  });
});
