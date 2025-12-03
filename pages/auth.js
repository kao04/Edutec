const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'ecoseed', // Ou 'web_02ma' se o ecoseed não tiver sido criado
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- NOVA ROTA: PÁGINA INICIAL (Mostra os dados no navegador) ---
app.get('/', async (req, res) => {
    try {
        // Busca nome e pontuação de todos, ordenado por pontuação
        const sql = `SELECT nome, score FROM users ORDER BY score DESC`;
        const [rows] = await pool.execute(sql);

        // Monta um HTML simples para exibir na tela
        let html = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>EcoSeed - Backend</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f4f4f4; }
                    table { margin: 0 auto; border-collapse: collapse; width: 50%; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                    th, td { padding: 15px; border-bottom: 1px solid #ddd; text-align: left; }
                    th { background-color: #40C057; color: white; }
                    h1 { color: #333; }
                    .status { color: green; font-weight: bold; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <h1>🍃 EcoSeed Backend</h1>
                <p class="status">✅ Servidor Online e Conectado ao Banco de Dados!</p>
                
                <h2>🏆 Ranking de Jogadores</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Nome</th>
                            <th>Pontuação</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Adiciona cada usuário na tabela
        rows.forEach((user, index) => {
            html += `
                <tr>
                    <td>#${index + 1}</td>
                    <td>${user.nome}</td>
                    <td><strong>${user.score}</strong></td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </body>
            </html>
        `;

        res.send(html);

    } catch (error) {
        res.send(`<h1 style="color:red">Erro ao conectar no banco: ${error.message}</h1>`);
    }
});

// --- ROTA: POST /cadastro ---
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ message: "Preencha todos os campos." });

    try {
        const sql = `INSERT INTO users (nome, email, senha, score) VALUES (?, ?, ?, 0)`;
        const [result] = await pool.execute(sql, [nome, email, senha]);
        res.status(201).json({ message: "Cadastro realizado com sucesso!", id: result.insertId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Este e-mail já está cadastrado." });
        res.status(500).json({ message: "Erro no servidor." });
    }
});

// --- ROTA: POST /login ---
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const sql = `SELECT * FROM users WHERE email = ? AND senha = ?`;
        const [rows] = await pool.execute(sql, [email, senha]);
        if (rows.length > 0) {
            const user = rows[0];
            res.status(200).json({ id: user.id, nome: user.nome, email: user.email, score: user.score });
        } else {
            res.status(401).json({ message: "E-mail ou senha incorretos." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro interno." });
    }
});

// --- ROTA: PUT /score ---
app.put('/score', async (req, res) => {
    const { userId, score } = req.body;
    try {
        const sql = `UPDATE users SET score = ? WHERE id = ?`;
        const [result] = await pool.execute(sql, [score, userId]);
        if (result.affectedRows > 0) res.status(200).json({ message: "Pontuação salva com sucesso!" });
        else res.status(404).json({ message: "Usuário não encontrado." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar pontuação." });
    }
});

// --- ROTA: GET /ranking (JSON para o Front) ---
app.get('/ranking', async (req, res) => {
    try {
        const sql = `SELECT nome, score FROM users ORDER BY score DESC LIMIT 10`;
        const [rows] = await pool.execute(sql);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar ranking." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});