// All the DOM selectors stored as short variables
const chat = document.getElementById('chat')
const inputWrapper = document.getElementById("input-wrapper")
const input = document.getElementById("input")
const button = document.getElementById("send")

// Global variables, if you need any, declared here
let currentQuestion = 1

// Functions declared here
const reply = (userMessage) => {
  showMessage(userMessage, "user")
} 
const question = (botQuestion) => {
  showMessage(botQuestion, "bot")
}
const nextQuestion = (message) => {
  console.log('currentQuestion', currentQuestion)

  if (currentQuestion === 1) {
    reply(message)
    input.value = ''
    setTimeout(() => whySave(message), 1000)
  } else if (currentQuestion === 2) {
    reply(message)
    setTimeout(() => howLong(message), 1000)
  } else if (currentQuestion === 3) {
    reply(message)
    setTimeout(() => riskProfile(message), 1000)
  } else {
    reply(message)
    setTimeout(resultSaving, 1000)
  }
}
// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

// Starts here
const greeting = () => {
  currentQuestion = 1
  question(`Hej! jag är SparBot, och jag kommer att hjälpa dig komma igång med ditt sparande. Först några frågor. Vad heter du?`, 'bot')
  // Just to check it out, change 'bot' to 'user' here 👆
}

const whySave = (name) => {
  currentQuestion++
  question(`Kul att du vill börja spara ${name}! Vad vill du spara till?`)

  inputWrapper.innerHTML = `
      <select id="select">
        <option value=""> Välj en anledning...</option>
        <option value="Pension">Pension</option>
        <option value="Barn">Barn</option>
        <option value="Något speciellt">Något speciellt</option>
        <option value="Känns som något man borde göra">Känns som något man borde göra</option>
      </select>
    `
    const select = document.getElementById('select')
    select.addEventListener('change', () => nextQuestion(select.value))
}

const howLong = (reason) => {
  currentQuestion++
  question(`${reason} är en bra anledning att börja spara! Hur länge tänkte du spara?`)
  
  inputWrapper.innerHTML = `
    <button id="shortBtn">Kortare än 5 år</button>
    <button id="mediumBtn">5–10 år</button>
    <button id="longBtn">Längre än 10 år</button>
  `
  document
    .getElementById('shortBtn')
    .addEventListener('click', () => nextQuestion('Kortare än 5 år'))
  document
    .getElementById('mediumBtn')
    .addEventListener('click', () => nextQuestion('5–10 år'))
  document
    .getElementById('longBtn')
    .addEventListener('click', () => nextQuestion('Längre än 10 år'))
}

const riskProfile = (time) => {
  currentQuestion++
  question(`${time} låter bra. Hur riskbenägen är du?`)

  inputWrapper.innerHTML = `
    <button id="highBtn">Gambler</button>
    <button id="midBtn">Lagom är bäst</button>
    <button id="lowBtn">Hängslen och livrem</button>
  `
  document
    .getElementById('hightBtn')
    .addEventListener('click', () => nextQuestion('Gambler'))
  document
    .getElementById('midBtn')
    .addEventListener('click', () => nextQuestion('Lagom är bäst'))
  document
    .getElementById('lowBtn')
    .addEventListener('click', () => nextQuestion('Hängslen och livrem'))
}


const resultSaving = () => {
  question("Du borde välja sparkonto. <a>Klicka här för att se dina förslag</a>")
  inputWrapper.innerHTML = ``
}

const resultBonds = () => {
}

const resultStocks = () => {
}
// Set up your eventlisteners here
button.addEventListener("click", () => nextQuestion(input.value))

// When website loaded, chatbot asks first question.
// normally we would invoke a function like this:
// greeting()
// But if we want to add a little delay to it, we can wrap it in a setTimeout:
// setTimeout(functionName, timeToWaitInMilliSeconds)
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greeting, 1000)

