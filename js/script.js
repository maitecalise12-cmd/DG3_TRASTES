document.addEventListener("DOMContentLoaded", function() {
    
    // Intersection Observer para las animaciones Fade-In al scrollear
    const fadeElements = document.querySelectorAll('.section-fade');

    const observerOptions = {
        root: null, // usa el viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% del elemento debe ser visible para disparar
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Desplazamiento suave para el botón principal del Hero
    const ctaButton = document.querySelector('.cta-primary');
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});