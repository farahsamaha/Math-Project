var scoreElm = document.querySelector('#score-val')
var questionElm = document.querySelector('#question')
var answerElms = document.querySelectorAll('.answer')
var startBtn = document.querySelector('#start-btn')
var timerElm = document.querySelector('#counter')

var question= {
  num1: 0,
  num2: 0,
  correct: 0,
}

var score = 0

var options = [0, 0, 0, 0]

var timer = 60

var x = null

startBtn.onclick = startGame

function startGame () {
  nextQ()
  hideStartButton()
  countDown()
}

function nextQ() {
  generateQ()
  generateAnswers()
}

function generateQ () {
  question.num1 = getRandom(2, 10)
  question.num2 = getRandom(2, 10)
  question.correct = question.num1 * question.num2

  showQ()
}

function showQ () {
  questionElm.innerText = question.num1 + ' X ' + question.num2
}

function generateAnswers () {
  var randomIndex = getRandom(0, 3)

  for (var i = 0; i < options.length; i++) {
    var t = getRandom(question.correct - 5, question.correct + 5)
    if (t == question.correct || options.find(function (item) { return item == t })) {
      i--
    } else {
      options[i] = t
    }
  }

  options[randomIndex] = question.correct

  showAnswers()
}

function showAnswers () {
  answerElms.forEach(function (answer, i) {
    answer.innerText = options[i]
    answer.onclick = validate
  })
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function hideStartButton () {
  startBtn.style.display = 'none'
}

function validate (e) {
  var current = e.target.innerText

  if (current == question.correct) {
    incrementScore()
    nextQ()
  } else {
    gameOver()
  }
}

function incrementScore () {
  score+=10
  updateScore()
}

function updateScore () {
  scoreElm.innerText = score
}

function countDown () {
  x = setInterval(checkTime, 1000)
}

function checkTime () {
  if (! --timer) {
    gameOver()
  }
  updateTimer()
}

function gameOver() {
  alert('Sorry! You Lost and you scored: ' + score)
  location.reload()
}

function updateTimer () {
  timerElm.innerText = timer
}