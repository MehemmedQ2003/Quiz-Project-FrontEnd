const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin"],
        correct: 0
    },
    {
        question: "What is 5 + 3?",
        options: ["7", "8", "9"],
        correct: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Jupiter"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
const totalQuestions = questions.length;
let correctAnswers = 0;
let wrongAnswers = 0;
let unansweredQuestions = 0;
let timerInterval;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

const timeLimit = 15;
let timeRemaining;

function startTimer() {
    timeRemaining = timeLimit;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            unansweredQuestions++;
            nextQuestion();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = `Time Remaining: ${timeRemaining}s`;
}

function loadQuestion() {
    clearInterval(timerInterval);
    nextBtn.disabled = true;
    quizContainer.innerHTML = "";

    const questionData = questions[currentQuestionIndex];
    const questionElement = document.createElement("h5");
    questionElement.className = "fw-bold mb-3";
    questionElement.textContent = `${currentQuestionIndex + 1}. ${questionData.question}`;

    quizContainer.appendChild(questionElement);

    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "form-check";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "question";
        input.id = `option${index}`;
        input.value = index;
        input.className = "form-check-input";

        const label = document.createElement("label");
        label.htmlFor = `option${index}`;
        label.className = "form-check-label";
        label.textContent = option;

        optionElement.appendChild(input);
        optionElement.appendChild(label);
        quizContainer.appendChild(optionElement);

        input.addEventListener("change", () => {
            nextBtn.disabled = false;
            clearInterval(timerInterval);
        });
    });

    startTimer();
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    const correctIndex = questions[currentQuestionIndex].correct;

    if (selectedOption && parseInt(selectedOption.value) === correctIndex) {
        correctAnswers++;
    } else if (selectedOption) {
        wrongAnswers++;
    }
}

function nextQuestion() {
    checkAnswer();

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    quizContainer.innerHTML = `
        <h5 class="text-success">Quiz completed! Thank you!</h5>
        <p class="text-primary fw-bold">Correct Answers: ${correctAnswers}</p>
        <p class="text-danger fw-bold">Wrong Answers: ${wrongAnswers}</p>
        <p class="text-warning fw-bold">Unanswered Questions: ${unansweredQuestions}</p>
    `;
    timerElement.textContent = "";
    nextBtn.style.display = "none";
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();