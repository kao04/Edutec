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
  
    // marca a correta em verde e, se o usuário errou, marca a escolhida em vermelho
    options.forEach((op, idx) => {
      op.onclick = null; // trava cliques
      if (idx === q.answer) op.classList.add("correct");       // sempre mostra a correta (verde)
      if (idx === choice && idx !== q.answer) op.classList.add("incorrect"); // a errada clicada fica vermelha
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
  
  // ===== EVENTOS =====
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
  