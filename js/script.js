document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ROTACIÓN DE PALABRAS DINÁMICAS EN EL HERO (Estilo Marketinero)
    const palabras = ["Alma", "Historia", "Precisión", "Mística"];
    let index = 0;
    const txtElement = document.getElementById('cambiar-palabra');

    setInterval(() => {
        index = (index + 1) % palabras.length;
        if(txtElement) {
            txtElement.style.opacity = 0; // Transición sutil
            setTimeout(() => {
                txtElement.textContent = palabras[index];
                txtElement.style.opacity = 1;
            }, 300);
        }
    }, 2500);


    // 2. INTERACCIÓN DE TARJETAS DE MADERAS (Acordeón)
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


    // 4. ANIMACIÓN DE ENTRADA (Reveal) Y ANIMACIÓN DE BARRAS DE PROGRESO
    const revealElements = document.querySelectorAll('.reveal');
    const barFills = document.querySelectorAll('.bar-fill');
    
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        // Revelar Secciones
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });

        // Cargar Barras de Progreso Dinámicamente cuando entran en pantalla
        barFills.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                const width = bar.style.getPropertyValue('--target-width');
                bar.style.width = width;
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Ejecución inicial
});

// 5. ENVÍO DE FORMULARIO CON POP-UP PREMIUM
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fullname').value;
    alert(`Estimado/a ${name}, tu postulación para un banco en el taller ha sido registrada con éxito. Un luthier evaluará tus datos y te contactará en un plazo máximo de 48 horas.`);
    document.getElementById('applicationForm').reset();
}