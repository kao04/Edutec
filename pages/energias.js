// Adiciona funcionalidade de smooth scroll para links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito de "fade-in" para seções ao rolar a página
const sections = document.querySelectorAll('section');

const options = {
    root: null, // viewport
    threshold: 0.1, // 10% da seção visível
    rootMargin: "0px"
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
    });
}, options);

sections.forEach(section => {
    // Não aplica o efeito na primeira seção (hero), que já deve estar visível
    if (!section.classList.contains('hero-section-energias')) {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    }
});