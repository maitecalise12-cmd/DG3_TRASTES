document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       A. INTERSECTION OBSERVER (Animación Suave al hacer Scroll)
       ========================================================================== */
    const revealElements = document.querySelectorAll(".reveal");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Desactivamos la observación tras el render inicial para optimizar hardware
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       B. SELECTOR INTERACTIVO DE MADERAS (Acordeón de Flex Transicional)
       ========================================================================== */
    const maderaCards = document.querySelectorAll(".madera-card");

    maderaCards.forEach(card => {
        card.addEventListener("click", () => {
            // Remueve el estado activo del resto de tarjetas
            maderaCards.forEach(c => {
                if (c !== card) c.classList.remove("expanded");
            });
            // Conmuta o fuerza el estado en la tarjeta seleccionada
            card.classList.add("expanded");
        });
    });

    /* ==========================================================================
       C. FAQ ACORDEÓN (Despliegue de Altura Calculada Dinámicamente)
       ========================================================================== */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        const content = item.querySelector(".faq-content");

        trigger.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // Cerrar cualquier otra pestaña abierta en el DOM
            faqItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-content").style.maxHeight = null;
            });

            // Si el actual estaba cerrado, lo abrimos calculando su scrollHeight
            if (!isActive) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

/* ==========================================================================
   D. CAPTACIÓN PREMIUM: CONTROL DE ENVÍO DE FORMULARIO
   ========================================================================== */
function handleFormSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector(".btn");
    
    // Feedback inmersivo e instantáneo para mejorar conversión
    btn.innerText = "Transmitiendo Solicitud...";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    setTimeout(() => {
        btn.innerText = "Postulación Recibida Con Éxito";
        btn.style.backgroundColor = "#1C421A";
        btn.style.borderColor = "#1C421A";
        btn.style.opacity = "1";
        alert("Tu solicitud de banco de trabajo ha sido registrada. Un Maestro Luthier se comunicará de forma directa para coordinar tu entrevista formal.");
        event.target.reset();
    }, 1800);
}