// Solicitar el nombre del usuario mediante una ventana emergente
const userName = prompt("Por favor, ingresa tu nombre:");
if (userName === null || userName === "") {
    alert("Nombre no proporcionado. La aplicación no puede continuar sin un nombre de usuario.");
}

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const timerContainer = document.getElementById("timer-container");

const questions = [
  { 
      question: 
      '¿Cual es la defincio de sofware?', 
      options: [
        'Un conjunto de productos de limpieza para computadoras', 
        'Es un conjunto de archivos y programas que tienen una secuencia de instrucciones', 
        'Un grupo de animales virtuales en la computadora',
        'Una mezcla de hardware y software en una computadora'
      ], 
      correctAnswer: 
      'Es un conjunto de archivos y programas que tienen una secuencia de instrucciones' 
  },
  { 
    question: 
    '¿Que es el Cpu?',
    options: [
      'Es la unidad de procesamiento central', 
      'Un dispositivo para enfriar la computadora', 
      'La unidad de producción central', 
      'El Centro de Procesamiento Universal'
    ], 
    correctAnswer: 
    'Es la unidad de procesamiento central' 
  },
  { 
    question: 
    '¿De que se ocupa la informatica?', 
    options: [
      'Estudia la manipulación de alimentos mediante computadoras',
      'Se ocupa del estudio de la manipulación de la información a través de una computadora',
      'Se ocupa del estudio de la información en la naturaleza', 
      'Se ocupa del estudio de la información a través de una calculadora'
    ], 
    correctAnswer: 
    'Se ocupa del estudio de la manipulación de la información a través de una computadora' 
  },
  {
     question: 
     'Menciona tres componentes básicos de una computadora.', 
     options: [
      'Ratón, teclado, monitor',
      'Altavoces, webcam, impresora',
      'Disco duro, memoria RAM, Placa madre',
      'CPU, GPU, fuente de poder'
    ],
    correctAnswer: 
    'Disco duro, memoria RAM, Placa madre' 
  },
  { 
    question: 
    'Menciona la estructura de un sistema informático y cuales son sus componentes.',
    options: [
      'El sistema consta de software únicamente',
      'Hardware y software no interactúan entre sí', 
      'El sistema se compone solo de dispositivos periféricos',
      'Un sistema se compone de un software y un hardware que trabajan juntos para procesar la información'
    ], 
    correctAnswer: 
    'Un sistema se compone de un software y un hardware que trabajan juntos para procesar la información' 
  },
  { 
    question: 
    '¿Porque es escencial la logica de programacion crear una aplicacion?', 
    options: [
      'Para convertir un problema en una secuencia de pasos logicos que realizara la computadora para poder resolver el problema',
      'Porque los programas se escriben al azar',
      'La lógica de programación no es necesaria',
      'Para confundir a la computadora y hacerla más inteligente'
    ], 
    correctAnswer: 
    'Para convertir un problema en una secuencia de pasos logicos que realizara la computadora para poder resolver el problema'
   },
  { 
    question:
     '¿Qué es un algoritmo? ',
    options: [
      'Una fórmula matemática compleja',
      'Un conjunto de instrucciones para bailar',
      'Un texto sin sentido',
      'Una secuencia de pasos para llegar a un fin'
    ],
    correctAnswer:
    'Una secuencia de pasos para llegar a un fin' 
  },
  // Agrega más preguntas según sea necesario
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeRemaining = 100; // 5 minutos en segundos

function startQuiz() {
  // Oculta el botón al comenzar el cuestionario
  const startButton = document.getElementById("startButton");
  if (startButton) {
      startButton.style.display = "none";
  }

  // Solo iniciamos el cuestionario si el nombre del usuario es válido
  if (userName && userName.trim() !== "") {
      showNextQuestion();
  } else {
      alert("Nombre no proporcionado. La aplicación no puede continuar sin un nombre de usuario.");
  }
}
    function showNextQuestion() {
        if (currentQuestion < questions.length) {
            const currentQ = questions[currentQuestion];
            const card = createQuestionCard(currentQ);

            const timerDiv = document.createElement("div");
            timerDiv.id = "timer-container";
            card.appendChild(timerDiv);

            card.appendChild(createOptions(currentQ.options));

            const nextButton = document.createElement("button");
            nextButton.textContent = "Siguiente Pregunta";
            nextButton.onclick = () => {
                calculateScore(currentQ.options);
                currentQuestion++;
                clearInterval(timer);
                quizContainer.innerHTML = "";
                showNextQuestion();
            };

            quizContainer.appendChild(card);
            quizContainer.appendChild(nextButton);

            startTimer(timerDiv);
        } else {
            clearInterval(timer);
            showResults();
        }
    }

    function createQuestionCard(question) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h2>${question.question}</h2>`;
        return card;
    }

    function createOptions(options) {
        const optionsContainer = document.createElement("div");

        options.forEach((option, index) => {
            const radioBtn = document.createElement("input");
            radioBtn.type = "radio";
            radioBtn.name = "answer";
            radioBtn.value = option;
            radioBtn.id = `option${index}`;

            const label = document.createElement("label");
            label.textContent = option;
            label.htmlFor = `option${index}`;

            optionsContainer.appendChild(radioBtn);
            optionsContainer.appendChild(label);
            optionsContainer.appendChild(document.createElement("br"));
        });

        return optionsContainer;
    }

    function startTimer(timerDiv) {
        timer = setInterval(() => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerDiv.textContent = `Tiempo restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            if (timeRemaining === 0) {
                clearInterval(timer);
                showResults();
            } else {
                timeRemaining--;
            }
        }, 1000);
    }

    function calculateScore(options) {
      const selectedAnswer = document.querySelector('input[name="answer"]:checked');
      if (selectedAnswer && selectedAnswer.value === questions[currentQuestion].correctAnswer) {
          score++;
      }
  }
  

    function showResults() {   
      const scorePercentage = ((score / questions.length) * 100).toFixed(2); // Dos decimales
      resultContainer.innerHTML = `<h2>Resultado Final</h2>
          <p>${userName || "Usuario"}, tu puntuación es: ${score} de ${questions.length} preguntas correctas (${scorePercentage}%)</p>`;
  }
  
  