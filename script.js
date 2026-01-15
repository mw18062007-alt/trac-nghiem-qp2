let quizData = [];
let current = 0;
let answeredCorrect = {}; // lưu trạng thái trả lời đúng

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const wrongBox = document.getElementById("wrong-box");
const retryBtn = document.getElementById("retry");

const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");

// Load JSON
fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {
    quizData = data;
    loadQuestion();
  });

function loadQuestion() {
  wrongBox.classList.add("hidden");
  answersEl.innerHTML = "";
  nextBtn.disabled = !answeredCorrect[current];

  const q = quizData[current];
  questionEl.textContent = `Câu ${current + 1}: ${q.question}`;

  for (const key in q.options) {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = `${key}. ${q.options[key]}`;

    if (answeredCorrect[current] && key === q.correct_answer) {
      btn.classList.add("correct");
    }

    btn.onclick = () => checkAnswer(btn, key);
    answersEl.appendChild(btn);
  }

  backBtn.disabled = current === 0;
}

function checkAnswer(button, selectedKey) {
  const correctKey = quizData[current].correct_answer;

  if (selectedKey === correctKey) {
    button.classList.add("correct");
    answeredCorrect[current] = true;
    nextBtn.disabled = false;
  } else {
    button.classList.add("wrong");
    wrongBox.classList.remove("hidden");
  }
}

retryBtn.onclick = () => {
  loadQuestion();
};

backBtn.onclick = () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
};

nextBtn.onclick = () => {
  if (current < quizData.length - 1 && answeredCorrect[current]) {
    current++;
    loadQuestion();
  }
};
