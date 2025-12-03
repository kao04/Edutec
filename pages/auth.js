// URL do seu Backend na Vercel
const API_URL = 'https://back-edutec-fz3s.vercel.app';
const SESSION_KEY = 'usuarioLogado';

// --- Função de Cadastro (Usada no cadastro.html) ---
async function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msgErro = document.getElementById('msgErro');

    // Validação simples no frontend
    if (!nome || !email || !senha) {
        mostrarErro(msgErro, "Preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            window.location.href = "login.html";
        } else {
            // Exibe erro vindo do backend (Ex: email duplicado)
            mostrarErro(msgErro, data.message || "Erro ao cadastrar.");
        }
    } catch (error) {
        console.error(error);
        mostrarErro(msgErro, "Erro de conexão com o servidor.");
    }
}

// --- Função de Login (Usada no login.html) ---
async function fazerLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const msgErro = document.getElementById('msgErro');

    if (!email || !senha) {
        mostrarErro(msgErro, "Preencha e-mail e senha.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Sucesso: Salva na Sessão do Navegador
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
            window.location.href = "quiz.html";
        } else {
            // Erro: Credenciais inválidas
            mostrarErro(msgErro, data.message || "Login falhou.");
        }
    } catch (error) {
        console.error(error);
        mostrarErro(msgErro, "Erro de conexão. O servidor está online?");
    }
}

// --- Função de Logout (Pode ser usada em qualquer página) ---
function fazerLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "login.html";
}

// --- Função Utilitária para Mostrar Erros na Tela ---
function mostrarErro(elemento, mensagem) {
    if (elemento) {
        elemento.textContent = mensagem;
        elemento.style.display = 'block';
        elemento.style.color = 'red';
        elemento.style.marginTop = '10px';
    } else {
        alert(mensagem);
    }
}