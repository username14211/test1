// Масив з питаннями квізу
const quizQuestions = [
    {
        question: "Що таке CI/CD?",
        options: [
            "Continuous Integration/Continuous Delivery",
            "Code Integration/Code Development",
            "Computer Interface/Computer Development",
            "Cloud Integration/Cloud Deployment"
        ],
        correctAnswer: 0
    },
    {
        question: "Який з цих інструментів НЕ є інструментом CI/CD?",
        options: [
            "Jenkins",
            "Travis CI",
            "Photoshop",
            "GitHub Actions"
        ],
        correctAnswer: 2
    },
    {
        question: "Яка основна перевага використання CI?",
        options: [
            "Зменшення часу розробки",
            "Раннє виявлення помилок",
            "Збільшення зарплати розробників",
            "Зменшення кількості коду"
        ],
        correctAnswer: 1
    },
    {
        question: "Що означає CD в CI/CD?",
        options: [
            "Compact Disc",
            "Code Documentation",
            "Continuous Delivery або Continuous Deployment",
            "Computer Development"
        ],
        correctAnswer: 2
    },
    {
        question: "Яка практика є ключовою для CI/CD?",
        options: [
            "Написання документації в останню чергу",
            "Автоматизація тестування",
            "Ручне розгортання",
            "Рідкі але великі коміти в репозиторій"
        ],
        correctAnswer: 1
    }
];

// Ініціалізація змінних
let currentQuestion = 0;
let score = 0;
let userAnswers = Array(quizQuestions.length).fill(null);

// DOM елементи
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const resultsDiv = document.getElementById('results');
const scoreSpan = document.getElementById('score');
const maxScoreSpan = document.getElementById('max-score');
const restartButton = document.getElementById('restart-btn');
const currentYearSpan = document.getElementById('current-year');

// Функція для ініціалізації квізу
function initQuiz() {
    // Встановлюємо поточний рік у футері
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Встановлюємо загальну кількість питань
    totalQuestionsSpan.textContent = quizQuestions.length;
    
    // Встановлюємо максимальний можливий бал
    maxScoreSpan.textContent = quizQuestions.length;
    
    // Завантажуємо перше питання
    loadQuestion();
    
    // Встановлюємо обробники подій для кнопок
    prevButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', goToNextQuestion);
    submitButton.addEventListener('click', submitQuiz);
    restartButton.addEventListener('click', restartQuiz);
}

// Функція для завантаження питання
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    questionText.textContent = question.question;
    
    // Оновлюємо номер поточного питання
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Очищаємо контейнер варіантів
    optionsContainer.innerHTML = '';
    
    // Додаємо варіанти відповідей
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Оновлюємо стан кнопок
    updateButtonsState();
}

// Функція для вибору варіанту відповіді
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    
    // Оновлюємо відображення вибраного варіанту
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Оновлюємо стан кнопок
    updateButtonsState();
}

// Функція для переходу до попереднього питання
function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Функція для переходу до наступного питання
function goToNextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

// Функція для оновлення стану кнопок
function updateButtonsState() {
    // Керування кнопкою "Попереднє"
    prevButton.disabled = currentQuestion === 0;
    
    // Керування кнопкою "Наступне" і "Завершити"
    if (currentQuestion === quizQuestions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
        
        // Перевіряємо, чи відповів користувач на всі питання
        const allQuestionsAnswered = userAnswers.every(answer => answer !== null);
        submitButton.disabled = !allQuestionsAnswered;
    } else {
        nextButton.style.display = 'block';
        submitButton.style.display = 'none';
    }
}

// Функція для завершення квізу і показу результатів
function submitQuiz() {
    // Підраховуємо кількість правильних відповідей
    score = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correctAnswer) {
            score++;
        }
    });
    
    // Показуємо результати
    scoreSpan.textContent = score;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('quiz-progress').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    resultsDiv.style.display = 'block';
}

// Функція для перезапуску квізу
function restartQuiz() {
    currentQuestion = 0;
    userAnswers = Array(quizQuestions.length).fill(null);
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('quiz-progress').style.display = 'block';
    document.querySelector('.controls').style.display = 'flex';
    resultsDiv.style.display = 'none';
    loadQuestion();
}

// Ініціалізуємо квіз після завантаження DOM
document.addEventListener('DOMContentLoaded', initQuiz);