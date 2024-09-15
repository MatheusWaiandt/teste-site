const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

// Substitua 'your-api-key' pela sua chave de API da OpenAI
const openai = new OpenAI({
  apiKey: 'sk-1kSskkDrt8kcIxULZ7ZvatZfetopqshWNLdvH-lM7tT3BlbkFJHxioucjpXIoHHwzA2gCsgW2Ihr2Bm6wbHuLO8Vl_8A'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

async function perguntarAoChatGPT(pergunta) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: pergunta }],
      max_tokens: 150
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
    return 'Desculpe, não consegui responder à sua pergunta.';
  }
}

app.post('/ask', async (req, res) => {
  const pergunta = req.body.pergunta;
  const resposta = await perguntarAoChatGPT(pergunta);
  res.json({ resposta });
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
