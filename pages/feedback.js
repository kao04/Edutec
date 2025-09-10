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


// ==========================================================================
// NOVA FUNCIONALIDADE: Mensagem de confirmação do formulário de feedback
// ==========================================================================

// Procura pelo formulário na página atual
const feedbackForm = document.getElementById('feedback-form');

// Se o formulário existir na página...
if (feedbackForm) {
  
  // Adiciona um "escutador" para o evento de 'submit'
  feedbackForm.addEventListener('submit', function(event) {
    
    // 1. Impede o comportamento padrão do formulário (que é recarregar a página)
    event.preventDefault();
    
    // 2. Encontra o container do formulário
    const formContainer = document.querySelector('.form-container');
    
    // 3. Cria a mensagem de agradecimento em HTML
    const thankYouMessage = `
      <div class="form-confirmation">
        <h1 class="form-title">Obrigado pelo <span class="text-green">Feedback!</span></h1>
        <p style="text-align: center; font-size: 1.1rem;">Sua mensagem foi enviada com sucesso.</p>
      </div>
    `;
    
    // 4. Substitui o conteúdo do container pela mensagem de agradecimento
    if (formContainer) {
      formContainer.innerHTML = thankYouMessage;
    }
    
  });
}