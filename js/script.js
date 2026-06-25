document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ROTACIÓN DE PALABRAS EN EL HERO
    const palabras = ["Madera", "Precisión", "Tensión", "Historia"];
    let index = 0;
    const txtElement = document.getElementById('cambiar-palabra');

    if (txtElement) {
        setInterval(() => {
            index = (index + 1) % palabras.length;
            txtElement.style.opacity = 0;
            setTimeout(() => {
                txtElement.textContent = palabras[index];
                txtElement.style.opacity = 1;
            }, 300);
        }, 2800);
    }

    // 2. ACORDEÓN DE MAPERAS EXÓTICAS (Optimizado para las nuevas Flash Cards)
    const maderaCards = document.querySelectorAll('.madera-card');

    maderaCards.forEach(card => {
        card.addEventListener('click', () => {
            // Si el usuario hace clic en la que ya está abierta, no hacemos nada
            if (card.classList.contains('expanded')) return;
            
            // Buscamos si hay otra abierta de antes y la cerramos SAFELY
            const actualmenteExpandida = document.querySelector('.madera-card.expanded');
            if (actualmenteExpandida) {
                actualmenteExpandida.classList.remove('expanded');
            }
            
            // Abrimos la tarjeta actual
            card.classList.add('expanded');
        });
    });

    // 3. PREGUNTAS FRECUENTES (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Cerramos las demás
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.faq-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                });

                // Si no estaba activa, la calculamos y abrimos
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
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
    checkScroll(); // Ejecución limpia inicial
});

// 5. ENVÍO DEL FORMULARIO DE CONSULTA PREMIUM
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fullname').value;
    alert(`Gracias por tu interés, ${name}. La solicitud conceptual de Custom Build ha sido enviada al atelier. Nos comunicaremos para agendar tu entrevista privada.`);
    document.getElementById('applicationForm').reset();
}