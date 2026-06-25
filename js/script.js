// =============================
// LOADER
// =============================

window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.add("loaded");
    }, 1600);
});


// =============================
// REVEAL ON SCROLL
// =============================

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => observer.observe(el));


// =============================
// CURSOR GLOW
// =============================

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
});


// =============================
// HERO PARALLAX
// =============================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
    const scroll = window.pageYOffset;

    hero.style.backgroundPositionY = `${scroll * 0.35}px`;
});


// =============================
// NAVBAR GLASS EFFECT
// =============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(15,15,15,0.75)";
        navbar.style.backdropFilter = "blur(14px)";
        navbar.style.padding = "22px 70px";
    } else {
        navbar.style.background = "transparent";
        navbar.style.backdropFilter = "blur(0px)";
        navbar.style.padding = "30px 70px";
    }
});


// =============================
// MAGNETIC BUTTON HOVER
// =============================

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0px,0px)";
    });

});


// =============================
// SMOOTH ANCHOR SCROLL
// =============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// =============================
// WOOD CARDS SUBTLE 3D TILT
// =============================

const cards = document.querySelectorAll(".wood-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / 20) * -1;
        const rotateY = ((x - centerX) / 20);

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });

});


// =============================
// OPTIONAL SCROLL PROGRESS BAR
// (descomentá si querés)
// =============================

/*
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "3px";
progressBar.style.background = "#CEAD59";
progressBar.style.zIndex = "99999";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
});
*/