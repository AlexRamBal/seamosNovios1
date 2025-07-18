document.addEventListener('DOMContentLoaded', function() {
  const elements = {
    yesBtn: document.getElementById('yes'),
    noBtn: document.getElementById('no'),
    message: document.getElementById('message'),
    music: document.getElementById('music'),
    container: document.querySelector('.container'),
    body: document.body
  };

  // Configuración responsive
  const config = {
    photos: [
        './imagenes/foto 1.jpg',
        './imagenes/foto 2.jpg',
        './imagenes/foto 3.jpg',
        './imagenes/foto 4.jpg',
        './imagenes/foto 5.jpg',
        './imagenes/foto 6.jpg',
        './imagenes/foto 7.jpg',
        './imagenes/foto 8.jpg',
        './imagenes/foto 9.jpg',
        './imagenes/foto 10.jpg',
        './imagenes/foto 11.jpg',
        './imagenes/foto 12.jpg',
        './imagenes/foto 13.jpg',
        './imagenes/foto 14.jpg',
        './imagenes/foto 15.jpg',
        './imagenes/foto 16.jpg',
        './imagenes/foto 17.jpg',
        './imagenes/foto 18.jpg'
    ],
    isMobile: () => window.innerWidth <= 600
  };

  // Al hacer clic en "Sí"
  elements.yesBtn.addEventListener('click', function() {
    elements.message.classList.remove('hidden');
    document.querySelector('.buttons').style.display = 'none';
    
    // Reproducir música (con manejo de errores para móviles)
    const playPromise = elements.music.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => console.log("Autoplay bloqueado:", e));
    }
    
    createHearts();
    showPhotos();
  });

  // Efecto para el botón "No"
  elements.noBtn.addEventListener(config.isMobile() ? 'touchstart' : 'mouseover', function(e) {
    if (config.isMobile()) e.preventDefault();
    
    const containerRect = elements.container.getBoundingClientRect();
    const maxX = containerRect.width - this.offsetWidth;
    const maxY = containerRect.height - this.offsetHeight;
    
    this.style.position = 'absolute';
    this.style.left = Math.random() * maxX + 'px';
    this.style.top = Math.random() * maxY + 'px';
  });

  // Crear corazones (responsive)
  function createHearts() {
    const count = config.isMobile() ? 20 : 40;
    
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'heart';
        
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        elements.body.appendChild(heart);
        
        // Limpiar después de 5 segundos
        setTimeout(() => heart.remove(), 5000);
      }, i * 100);
    }
  }

  // Mostrar fotos (responsive)
  function showPhotos() {
    config.photos.forEach((imgSrc, i) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.className = 'photo';
      img.style.animationDelay = `${i * 0.3}s`;
      img.style.left = `${Math.random() * 90}vw`;
      img.style.top = `${Math.random() * 90}vh`;
      
      elements.body.appendChild(img);
    });
  }
});