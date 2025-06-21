/**
 * Menú Hamburguesa - Proceso Térmico
 * Versión mejorada con mejores prácticas y mayor robustez
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    const menuIcon = document.querySelector('.menu-icon');
    const overlay = document.createElement('div');
    
    // Validación de elementos
    if (!menuToggle || !nav || !menuIcon) {
        console.error('Error: Elementos esenciales del menú no encontrados');
        return;
    }

    // Crear overlay dinámicamente
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Estado inicial
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay.style.display = 'none';

    // Evento para abrir/cerrar menú
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Actualizar estado
        this.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        overlay.style.display = isExpanded ? 'none' : 'block';
        
        // Cambiar ícono
        menuIcon.textContent = isExpanded ? '☰' : '✕';
        
        // Bloquear/desbloquear scroll
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Cerrar menú al hacer clic en overlay
    overlay.addEventListener('click', function() {
        closeMenu();
    });

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('#main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Cerrar menú al presionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Función para cerrar menú
    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuIcon.textContent = '☰';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
});