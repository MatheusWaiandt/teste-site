const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

function addMessage(message, isUser = false) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.classList.add(isUser ? 'user' : 'bot');

    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user' : 'bot');

    messageContainer.appendChild(messageElement);
    chatbox.appendChild(messageContainer);
    chatbox.scrollTop = chatbox.scrollHeight;  // Rolagem automática para a última mensagem
}

function processUserInput() {
    const userMessage = userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    let botResponse = '';

    // Lógica para processar a mensagem do usuário
    if (userMessage === 'olá') {
        botResponse = 'Olá! Como posso ajudar?';
    } else if (userMessage === 'estou me sentindo triste') {
        botResponse = 'Entendo. É importante expressar seus sentimentos. O que mais você gostaria de compartilhar?';
    } else if (userMessage === 'como lidar com a ansiedade?') {
        botResponse = 'A ansiedade é comum. Tente técnicas de respiração profunda e considere buscar apoio profissional.';
    } else {
        botResponse = 'Desculpe, não entendi. Pode reformular?';
    }
    
    addMessage(`Você disse: ${userMessage}`, true);
    addMessage(botResponse, false);
    userInput.value = ''; // Limpar o campo de entrada
}

userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        processUserInput();
    }
});