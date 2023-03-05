const api_key = 'API_KEY';
const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function askGPT(prompt) {
  const response = await axios.post(endpoint, {
    prompt,
    max_tokens: 1024,
    n: 1,
    stop: '\n',
    temperature: 0.5,
  }, {
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data.choices[0].text.trim();
}

async function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();

  if (!message) {
    return;
  }

  messageInput.value = '';

  const chatLogs = document.getElementById('chatlogs');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat');
  messageElement.innerText = message;
  chatLogs.appendChild(messageElement);

  const answer = await askGPT(message);

  const responseElement = document.createElement('div');
  responseElement.classList.add('chat', 'bot');
  responseElement.innerText = answer;
  chatLogs.appendChild(responseElement);

  chatLogs.scrollTop = chatLogs.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
  const sendButton = document.getElementById('send-button');
  sendButton.addEventListener('click', sendMessage);
});
