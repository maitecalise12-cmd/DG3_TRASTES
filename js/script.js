document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ROTACIÓN DE PALABRAS EN EL HERO SECTOR
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

    // 2. INTERACCIÓN DE LAS FLASH CARDS (MADERAS EXÓTICAS)
    const maderaCards = document.querySelectorAll('.madera-card');

    maderaCards.forEach(card => {
        card.addEventListener('click', () => {
            // Si el usuario hace clic en una tarjeta expandida, no hace nada
            if (card.classList.contains('expanded')) return;
            
            // Remueve de forma segura la expansión de la tarjeta previa
            const actualmenteExpandida = document.querySelector('.madera-card.expanded');
            if (actualmenteExpandida) {
                actualmenteExpandida.classList.remove('expanded');
            }
            
            // Añade la expansión a la tarjeta seleccionada
            card.classList.add('expanded');
        });
    });

    // 3. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Resetea los demás acordeones abiertos
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.faq-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                });

                // Si no estaba activo, calcula dinámicamente el alto para la animación smooth
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });

    // 4. SISTEMA REVEAL AL HACER SCROLL & ANIMACIÓN DE BARRAS
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
    checkScroll(); // Carga de control inicial
});

// 5. ENVÍO INTEGRADO DEL FORMULARIO PRIVADO
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fullname').value;
    alert(`Gracias por tu interés, ${name}. Tu solicitud de Custom Build ha sido recibida en el atelier. Nos comunicaremos a la brevedad.`);
    document.getElementById('applicationForm').reset();
}