let questions = [];
let currentQuestionIndex = 0;
let answeredCorrect = false;

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  });

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById("question").innerText =
    `Câu ${currentQuestionIndex + 1}: ${q.question}`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";
  answeredCorrect = false;
  document.getElementById("nextBtn").disabled = true;
  document.getElementById("feedback").innerText = "";

  q.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;

    btn.onclick = () => {
      if (answeredCorrect) return;

      if (ans.correct) {
        btn.classList.add("correct");
        document.getElementById("feedback").innerText = "✔ Đúng!";
        answeredCorrect = true;
        document.getElementById("nextBtn").disabled = false;
      } else {
        btn.classList.add("wrong");
        document.getElementById("feedback").innerText = "✖ Sai, chọn lại!";
      }
    };

    answersDiv.appendChild(btn);
  });
}

// Back / Next
document.getElementById("backBtn").onclick = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
};

document.getElementById("nextBtn").onclick = () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
};

// Nhảy tới câu
document.getElementById("jumpBtn").onclick = () => {
  const n = parseInt(document.getElementById("jumpInput").value);
  if (n >= 1 && n <= questions.length) {
    currentQuestionIndex = n - 1;
    loadQuestion();
  } else {
    alert("Câu không tồn tại");
  }
};
