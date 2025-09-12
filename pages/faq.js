document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const sections = document.querySelectorAll('section');
const options = {
    root: null, 
    threshold: 0.1, 
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
    if (!section.classList.contains('hero-section-energias') && 
        !section.classList.contains('hero-section-mudancas') && 
        !section.classList.contains('hero-section-reciclagem') && 
        !section.classList.contains('hero-section-ecossistema')) {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(section);
    }
});


const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formContainer = document.querySelector('.form-container');
    const thankYouMessage = `
      <div class="form-confirmation">
        <h1 class="form-title">Obrigado pelo <span class="text-green">Feedback!</span></h1>
        <p style="text-align: center; font-size: 1.1rem;">Sua mensagem foi enviada com sucesso.</p>
      </div>
    `;
    if (formContainer) {
      formContainer.innerHTML = thankYouMessage;
    }
  });
}


const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');

        questionButton.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    });
}