const clintonSelectorBtn = document.querySelector("#Clinton")
const AnneSelectorBtn = document.querySelector("#Anne")
const chatHeader = document.querySelector(".chat-header")
const chatMessages = document.querySelector(".chat-messages")
const chatInputForm = document.querySelector(".chat-input-form")
const chatInput = document.querySelector(".chat-input")
const clearChatBtn = document.querySelector(".clear-button")

const messages = JSON.parse(localStorage.getItem('messages')) || []

const chatMessageElement = (message) => `
<div class="message ${message.sender === "Clinton" ? "blue-g": "green-g"}">
    <div class="message-sender">${message.sender} </div>
    <div class="message-text">${message.text} </div>
    <div class="message-timestamp">${message.timestamp}</div>
</div>
`

window.onload = () => {
    messages.forEach((message) =>{
    chatMessages.innerHTML += chatMessageElement(message)
    })
}

let messageSender = 'Clinton'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === 'Clinton') {
        clintonSelectorBtn.classList.add('active-human')
        AnneSelectorBtn.classList.remove('active-human')
    }
    if (name === 'Anne'){
        AnneSelectorBtn.classList.add('active-human')    
        clintonSelectorBtn.classList.remove('active-human')
    }

    chatInput.focus()
}

clintonSelectorBtn.onclick = () => updateMessageSender('Clinton')
AnneSelectorBtn.onclick = () => updateMessageSender('Anne')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('en-US', {hour: 'numeric', minute:'numeric', hour12:true})
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))
    chatMessages.innerHTML += chatMessageElement(message)

    chatInputForm.reset()
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})