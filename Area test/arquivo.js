document.getElementById('sendButton').addEventListener('click', processUserInput);
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processUserInput();
    }
});

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

async function processUserInput() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Adiciona mensagem do usuário ao chatbox
    addMessage(userMessage, true);
    userInput.value = '';  // Limpar o campo de entrada
    
    // Monta o payload para a API do OpenAI
    const payload = {
        model: "text-davinci-003",  // Use o nome do modelo correto
        prompt: userMessage,
        max_tokens: 150
    };

    try {
        // Faz a requisição à API do ChatGPT
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer YOUR_API_KEY`  // Substitua pela sua chave de API
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        addMessage(botMessage, false);  // Adiciona a resposta do bot ao chatbox

    } catch (error) {
        console.error('Erro ao contatar a API do ChatGPT:', error);
        addMessage('Desculpe, ocorreu um erro ao processar sua solicitação.', false);
    }
}