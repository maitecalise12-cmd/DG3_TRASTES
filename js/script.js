document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ROTACIÓN DE PALABRAS EN EL HERO
    const palabras = ["Madera", "Precisión", "Tensión", "Historia"];
    let index = 0;
    const txtElement = document.getElementById('cambiar-palabra');

    setInterval(() => {
        index = (index + 1) % palabras.length;
        if(txtElement) {
            txtElement.style.opacity = 0;
            setTimeout(() => {
                txtElement.textContent = palabras[index];
                txtElement.style.opacity = 1;
            }, 300);
        }
    }, 2800);

    // 2. ACORDEÓN DE MADERAS EXÓTICAS
    const maderaCards = document.querySelectorAll('.madera-card');

    maderaCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('expanded')) return;
            document.querySelector('.madera-card.expanded')?.classList.remove('expanded');
            card.classList.add('expanded');
        });
    });

    // 3. PREGUNTAS FRECUENTES (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 4. ANIMACIÓN REVEAL Y BARRAS DE PROGRESO AL HACER SCROLL
    const revealElements = document.querySelectorAll('.reveal');
    const barFills = document.querySelectorAll('.bar-fill');
    
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.88;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });

        barFills.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                const width = bar.style.getPropertyValue('--target-width');
                bar.style.width = width;
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// 5. ENVÍO DEL FORMULARIO DE CONSULTA PREMIUM
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fullname').value;
    alert(`Gracias por tu interés, ${name}. La solicitud conceptual de Custom Build ha sido enviada al atelier. Nos comunicaremos para agendar tu entrevista privada.`);
    document.getElementById('applicationForm').reset();
}