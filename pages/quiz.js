const QUIZ = [
  {
    topic: "Mudanças Climáticas",
    items: [
      {q: "Qual é o principal gás de efeito estufa emitido por humanos?", options:["Ozônio","Vapor d'água","CO₂","Metano"], answer:2},
      {q: "O acordo internacional de 2015 sobre clima é:", options:["Kyoto","Paris","Montreal","Agenda 21"], answer:1},
      {q: "O degelo do Ártico aumenta o aquecimento porque:", options:["Aumenta vulcões","Reduz albedo","Libera urânio","Causa chuvas"], answer:1},
      {q: "O setor que mais emite GEE no mundo é:", options:["Agricultura","Resíduos","Energia elétrica e calor","Aviação"], answer:2},
      {q: "Fenômeno extremo associado ao aquecimento global:", options:["Nevascas tropicais","Secas prolongadas","Menos furacões","Estiagem polar"], answer:1},
      {q: "O buraco na camada de ozônio é causado principalmente por:", options:["CO₂","CFCs","CH₄","N₂O"], answer:1},
      {q: "O IPCC é:", options:["Painel da ONU sobre clima","Agência espacial","Empresa de petróleo","Protocolo de reciclagem"], answer:0}
    ]
  },
  {
    topic: "Reciclagem",
    items: [
      {q:"No código dos plásticos, o número 1 é:", options:["PP","PET","PVC","PS"], answer:1},
      {q:"Material que mais economiza energia ao reciclar:", options:["Papel","Vidro","Alumínio","Aço"], answer:2},
      {q:"Não deve ir na coleta seletiva seca:", options:["PET lavada","Jornal","Caixa de pizza engordurada","Lata"], answer:2},
      {q:"Na coleta, cor azul significa:", options:["Vidro","Papel","Metal","Plástico"], answer:1},
      {q:"Reciclar papel economiza:", options:["Água","Petróleo","Carvão","Urânio"], answer:0},
      {q:"O símbolo universal da reciclagem é:", options:["Setas em círculo","Três setas em triângulo","Círculo verde","Letra R"], answer:1},
      {q:"Qual destes é reciclável?", options:["Copo descartável limpo","Papel carbono","Guardanapo usado","Bituca de cigarro"], answer:0}
    ]
  },
  {
    topic: "Ecossistema",
    items: [
      {q:"Relação em que ambos ganham:", options:["Comensalismo","Mutualismo","Parasitismo","Amensalismo"], answer:1},
      {q:"Espécies-chave são importantes porque:", options:["Sempre são predadores","Sua remoção afeta todo ecossistema","São abundantes","Vivem em montanhas"], answer:1},
      {q:"Espécies pioneiras na sucessão são:", options:["Líquens e gramíneas","Grandes árvores","Mamíferos","Corais"], answer:0},
      {q:"Bioma Cerrado é caracterizado por:", options:["Floresta úmida","Savanas adaptadas ao fogo","Gelo","Mangue"], answer:1},
      {q:"A fotossíntese é essencial porque:", options:["Produz oxigênio","Consome nitrogênio","Gera calor","Aumenta salinidade"], answer:0},
      {q:"O topo da cadeia alimentar geralmente é ocupado por:", options:["Herbívoros","Carnívoros","Plantas","Decompositores"], answer:1},
      {q:"Decompositores têm papel de:", options:["Produzir oxigênio","Reciclar nutrientes","Predar herbívoros","Gerar energia eólica"], answer:1}
    ]
  },
  {
    topic: "Energias Renováveis",
    items: [
      {q:"Solar fotovoltaica se diferencia porque:", options:["Usa calor","Converte luz em eletricidade","Funciona só à noite","É sempre mais barata"], answer:1},
      {q:"Fontes intermitentes:", options:["Solar e eólica","Hidrelétrica","Nuclear","Carvão"], answer:0},
      {q:"Desvantagem da biomassa:", options:["Pode poluir se mal queimada","Não pode armazenar","Só em polos","Usa urânio"], answer:0},
      {q:"Hidrelétricas a fio d’água têm:", options:["Mais alagamento","Menos alagamento","Usam carvão","No mar"], answer:1},
      {q:"Energia geotérmica vem de:", options:["Calor interno da Terra","Sol","Água salgada","Movimento dos ventos"], answer:0},
      {q:"Energia das marés é chamada:", options:["Solar térmica","Maremotriz","Fotossíntese","Biomassa"], answer:1},
      {q:"Uma vantagem da eólica é:", options:["Zerar impacto ambiental","Baixa emissão de carbono","Não depende do vento","Usa carvão"], answer:1}
    ]
  }
];


let questions = [];
let current = 0;
let score = 0;
let scoreByTopic = {};


const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const topicEl = document.getElementById("topic");
const qEl = document.getElementById("question");
const optEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const scoreCards = document.getElementById("scoreCards");


function startQuiz(){
  questions = [];
  scoreByTopic = {};
  QUIZ.forEach(t => {
    scoreByTopic[t.topic] = {right:0, total:t.items.length};
    t.items.forEach(i => questions.push({...i, topic:t.topic}));
  });
  current = 0;
  score = 0;
  startBtn.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

function showQuestion(){
  if(current >= questions.length){
    return endQuiz();
  }
  const q = questions[current];
  topicEl.textContent = q.topic;
  qEl.textContent = q.q;
  optEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  progressEl.textContent = `Pergunta ${current+1} de ${questions.length}`;

  q.options.forEach((op, idx) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = op;
    div.onclick = () => checkAnswer(idx);
    optEl.appendChild(div);
  });
}

function checkAnswer(choice){
  const q = questions[current];
  const options = optEl.querySelectorAll(".option");

  options.forEach((op, idx) => {
    op.onclick = null; // trava cliques
    if (idx === q.answer) op.classList.add("correct");     
    if (idx === choice && idx !== q.answer) op.classList.add("incorrect"); 
  });

  if(choice === q.answer){
    feedbackEl.textContent = "✔ Correto!";
    score++;
    scoreByTopic[q.topic].right++;
  } else {
    feedbackEl.textContent = "✖ Incorreto!";
  }
  nextBtn.classList.remove("hidden");
}

function nextQuestion(){
  current++;
  showQuestion();
}

function endQuiz(){
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score;

  scoreCards.innerHTML = "";
  for(const topic in scoreByTopic){
    const card = document.createElement("div");
    card.className = "cardScore";
    card.innerHTML = `<h3>${topic}</h3><p>${scoreByTopic[topic].right} / ${scoreByTopic[topic].total}</p>`;
    scoreCards.appendChild(card);
  }
}


startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);