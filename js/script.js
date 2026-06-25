document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECTOR INTERACTIVO DE MADERAS (Acordeón)
    const maderaCards = document.querySelectorAll('.madera-card');

    maderaCards.forEach(card => {
        card.addEventListener('click', () => {
            // Si la tarjeta ya está expandida, no hacemos nada
            if (card.classList.contains('expanded')) return;

            // Quitamos la clase 'expanded' de la tarjeta que la tenga actualmente
            document.querySelector('.madera-card.expanded')?.classList.remove('expanded');

            // Le agregamos la clase 'expanded' a la tarjeta que recibió el clic
            card.classList.add('expanded');
        });
    });

    // 2. PREGUNTAS FRECUENTES (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerramos cualquier otra pregunta abierta
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-content').style.maxHeight = null;
            });

            // Si la que clickeamos no estaba activa, la abrimos calculando su altura
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 3. EFECTO REVEAL (Aparición suave al hacer scroll)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Ejecutar al cargar la página y al hacer scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Activa los elementos que ya están visibles al inicio
});

// 4. CONTROL DEL FORMULARIO DE CONTACTO
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('fullname').value;
    
    // Simulación premium de envío exitoso
    alert(`Gracias ${name}. Tu postulación ha sido recibida en el taller. Un luthier se contactará contigo en las próximas 48 horas.`);
    
    document.getElementById('applicationForm').reset();
}