
const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyperlink Tool Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        choices: ["color", "text-color", "font-color", "text-style"],
        correctAnswer: "color"
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "function", "float"],
        correctAnswer: "float"
    },
    {
        question: "What is TypeScript primarily used for?",
        choices: ["Styling web pages", "Building databases", "Adding type annotations to JavaScript", "Creating animations"],
        correctAnswer: "Adding type annotations to JavaScript"
    },
        {
        question: "Which CSS property is used to set the spacing between lines of text?",
        choices: ["text-spacing", "line-height", "letter-spacing", "spacing-line"],
        correctAnswer: "line-height"
    },
    {
        question: "What is the result of the expression: 5 + '10'?",
        choices: ["15", "510", "50", "Error"],
        correctAnswer: "510"
    },
    {
        question: "What is the purpose of the 'var' keyword in JavaScript?",
        choices: ["Declares a variable with block scope", "Declares a variable with function scope", "Declares a global variable", "Declares a constant variable"],
        correctAnswer: "Declares a variable with function scope"
    },
       {
        question: "Which CSS property is used to change the size of an element's border radius?",
        choices: ["border-width", "border-radius", "border-style", "border-size"],
        correctAnswer: "border-radius"
    },
    {
        question: "In JavaScript, what does the 'typeof' operator return for an array?",
        choices: ["array", "object", "array-like", "list"],
        correctAnswer: "object"
    }
   
];


const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let totalScore = 0;
let timer = null;

function startTimer() {
    let seconds = 15; // Setting the timer duration in seconds
    timer = setInterval(function () {
        seconds--;
        if (seconds <= 0) {
            clearInterval(timer);
            showResult();
            moveNext();
        }
    }, 1000);
}

function moveNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(function () {
            showQuestion();
        }, 2000);
    } else {
        showFinalResult();
    }
}

function showQuestion() {
    clearInterval(timer);
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    const choicesHTML = currentQuestion.choices.map(choice => {
        return `<label><input type="radio" name="answer" value="${choice}"> ${choice}</label>`;
    }).join("");
    choicesElement.innerHTML = choicesHTML;

    resultElement.style.display = "none";
    submitButton.disabled = false;
}

submitButton.addEventListener("click", function () {
    clearInterval(timer);
    showResult();
    moveNext();
});

function showResult() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const selectedValue = selectedAnswer.value;
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        const isCorrect = selectedValue === correctAnswer;
        resultElement.textContent = isCorrect ? "Correct!" : "Incorrect! The correct answer is: " + correctAnswer;
        resultElement.style.display = "block";
        submitButton.disabled = true;
        if (isCorrect) {
            totalScore++;
        }
    }
}

function showFinalResult() {
    questionElement.textContent = "Quiz Completed!";
    choicesElement.innerHTML = "";
    submitButton.disabled = true;
    scoreElement.textContent = `Total Score: ${totalScore} out of ${questions.length}`;
}

showQuestion();
