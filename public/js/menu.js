/**
 * Controlador de Menú Hamburguesa - Proceso Térmico
 * Versión optimizada para rendimiento y accesibilidad
 * 
 * Funcionalidades:
 * - Apertura/cierre del menú
 * - Cierre al hacer clic fuera
 * - Cierre al seleccionar enlace
 * - Cierre con tecla ESC
 * - Gestión de scroll
 * - Compatibilidad con lectores de pantalla
 */

class MobileMenu {
  constructor() {
    this.menuToggle = document.querySelector('.menu-toggle');
    this.nav = document.getElementById('main-nav');
    this.menuIcon = document.querySelector('.menu-icon');
    this.overlay = this.createOverlay();
    this.isOpen = false;

    this.init();
  }

  init() {
    // Validar elementos esenciales
    if (!this.menuToggle || !this.nav || !this.menuIcon) {
      console.error('Elementos del menú no encontrados');
      return;
    }

    // Configurar estado inicial
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.menuToggle.setAttribute('aria-controls', 'main-nav');
    this.menuToggle.setAttribute('aria-label', 'Menú de navegación');

    // Event listeners
    this.menuToggle.addEventListener('click', () => this.toggleMenu());
    this.overlay.addEventListener('click', () => this.closeMenu());
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Cerrar al hacer clic en enlaces (para navegación móvil)
    document.querySelectorAll('#main-nav a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.setAttribute('role', 'presentation');
    document.body.appendChild(overlay);
    return overlay;
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  openMenu() {
    this.isOpen = true;
    this.menuToggle.setAttribute('aria-expanded', 'true');
    this.nav.classList.add('active');
    this.overlay.style.display = 'block';
    this.menuIcon.textContent = '✕';
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    
    // Enfocar el primer elemento del menú
    setTimeout(() => {
      const firstLink = this.nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }, 100);
  }

  closeMenu() {
    this.isOpen = false;
    this.menuToggle.setAttribute('aria-expanded', 'false');
    this.nav.classList.remove('active');
    this.overlay.style.display = 'none';
    this.menuIcon.textContent = '☰';
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    
    // Devolver foco al botón del menú
    this.menuToggle.focus();
  }

  handleKeyDown(e) {
    // Cerrar con ESC
    if (e.key === 'Escape' && this.isOpen) {
      this.closeMenu();
    }
    
    // Trampa de foco para teclado (solo cuando el menú está abierto)
    if (this.isOpen && e.key === 'Tab') {
      const focusableElements = this.nav.querySelectorAll('a');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
});