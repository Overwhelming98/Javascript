
//gereElementById uppsetting
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex
//þegar þessi button er notaður keyra kóðan í startGame
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  //læt spurningarnar koma í randowm roð
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  //reseta qestuion index
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
//vel nýja spurningu
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
// birti spurningar
function showQuestion(question) {
  //sýni firstu spurningu
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('button')
    // ef svar er rett geri background grænan með css
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
//hreinsar skjá þegar spurningu er svarða
function resetState() {
  //hreinsa background color geri hann aftur blue
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  //ef það er barn inní answerbuttonse lementinu þá hreinsa það
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  // chekka hvort svar sé rétt
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  // chekka hovrt vip séum á síðustu spurningu
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    // ef við erum á last question þá byrta restart buttion
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  //hreinsa
  clearStatusClass(element)
  //ef rétt svar adda í classlist sem rétt
  if (correct) {
    element.classList.add('correct')
    //sama bara rángt
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
// bí til spurningar og svört
const questions = [
  {
    question: 'What is the name of my bird?',
    answers: [
      { text: 'Robbi', correct: true },
      { text: 'fjola', correct: false },
      { text: 'Danni', correct: false },
      { text: 'Andrea', correct: false },
    ]
  },
  {
    question: 'What is the best game of the year?',
    answers: [
      { text: 'Warcraft Remasterd', correct: false },
      { text: 'World of Warcraft', correct: false },
      { text: 'Counter Strike', correct: false },
      { text: 'Valorant', correct: true }
    ]
  },
  {
    question: 'What is the best anime this season',
    answers: [
      { text: 'Ishuzoku Reviewers', correct: false },
      { text: 'Haikyuu!!: To the Top', correct: true },
      { text: 'Eizouken ni wa Te wo Dasu na!', correct: false },
      { text: 'Dorohedoro', correct: false }
    ]
  },
  {
    question: 'Who is the best Valorant player?',
    answers: [
      { text: 'Sindri', correct: true },
      { text: 'Andri', correct: false }
    ]
  }
]