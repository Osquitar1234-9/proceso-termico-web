document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  
  if(menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      // Alternar estado del menú
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
      
      // Cambiar ícono
      const icon = this.querySelector('.menu-icon');
      if(nav.classList.contains('open')) {
        icon.textContent = '✕';
        this.setAttribute('aria-expanded', 'true');
      } else {
        icon.textContent = '☰';
        this.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Cerrar menú al hacer clic en enlaces (solo en móvil)
    document.querySelectorAll('#main-nav a').forEach(link => {
      link.addEventListener('click', function() {
        if(window.innerWidth <= 768) {
          nav.classList.remove('open');
          document.body.classList.remove('menu-open');
          menuToggle.querySelector('.menu-icon').textContent = '☰';
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});
