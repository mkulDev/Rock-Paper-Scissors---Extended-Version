const rulesBtn = document.querySelector('.rules-btn')
const popUpRules = document.querySelector('.pop-up-rules')
const closePopUp = document.querySelector('.close-pop-up')
const optionsBtn = document.querySelectorAll('.button')
const sectionOptions = document.querySelector('.options')
const humanOption = document.getElementById('human-choice')
const computerOption = document.getElementById('computer-choice')
const figthScreen = document.querySelector('.fight')
const Score = document.getElementById('score')
const resultScreen = document.querySelector('.game-info')
const resultInfo = document.querySelector('.result-info')
const playAgainBtn = document.querySelector('.play-again')
const buttons = document.querySelectorAll('button')
const sound = document.querySelector('audio')

let playerChoice
let computerChoice

sectionOptions.classList.add('active')
rulesBtn.addEventListener('click', () => {
  popUpRules.classList.add('active')
})

closePopUp.addEventListener('click', () => {
  popUpRules.classList.remove('active')
})

buttons.forEach((element) =>
  element.addEventListener('mouseenter', () => {
    sound.currentTime = 0
    sound.play()
  })
)

optionsBtn.forEach((element) =>
  element.addEventListener('click', () => {
    playerChoice = element.dataset.choice
    sectionOptions.classList.remove('active')
    gameStart(playerChoice)
  })
)

const getComputerChoice = () => {
  const options = ['rock', 'paper', 'scissors', 'lizard', 'spock']
  const randomNumber = Math.floor(Math.random() * options.length)
  computerChoice = options[randomNumber]
}

function determWinner() {
  const conditionsOfWining = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['scissors', 'rock'],
  }
  if (conditionsOfWining[playerChoice].includes(computerChoice)) {
    showResult('winner')
  } else if (playerChoice === computerChoice) {
    showResult('draw')
  } else {
    showResult('lose')
  }
}

const showResult = (result) => {
  resultScreen.classList.add('active')
  if (result === 'winner') {
    Score.innerText = Number(Score.innerText) + 1
    resultInfo.innerText = 'YOU WIN'
    console.log('winner')
  } else if (result === 'draw') {
    resultInfo.innerText = 'DRAW'
    console.log('draw')
  } else {
    resultInfo.innerText = 'YOU LOSE'
    Score.innerText = Number(Score.innerText) - 1
  }
  playAgainBtn.addEventListener('click', () => {
    ResetGame()
  })
}

function createFightButton(choice, placeHolder) {
  figthScreen.classList.add('active')
  const newBtn = document.createElement('button')
  newBtn.classList.add('button', `button-${choice}`)
  const imgContainer = document.createElement('div')
  imgContainer.classList.add('img-container')
  const newImg = document.createElement('img')
  newImg.src = `./images/icon-${choice}.svg`
  newImg.alt = `${choice}-icon`
  newImg.classList.add(`${choice}-btn`)
  imgContainer.appendChild(newImg)
  newBtn.appendChild(imgContainer)
  placeHolder.appendChild(newBtn)
}
function gameStart(choice) {
  figthScreen.classList.add('active')

  createFightButton(choice, humanOption)
  getComputerChoice()
  setTimeout(() => {
    createFightButton(computerChoice, computerOption)
    setTimeout(() => {
      if (playerChoice && computerChoice) {
        determWinner()
      }
    }, 1000)
  }, 1000)
}

const ResetGame = () => {
  playerChoice = ''
  computerChoice = ''
  sectionOptions.classList.add('active')
  figthScreen.classList.remove('active')
  resultScreen.classList.remove('active')
  if (humanOption.childElementCount === 2 && computerOption.childElementCount === 2) {
    humanOption.removeChild(humanOption.lastChild)
    computerOption.removeChild(computerOption.lastChild)
  }
}
