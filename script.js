const my_chabhi = 'AIzaSyCaGDKCTrNqx5uICnWxAJlfimr1Xzhuqvc'; 
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const initialPrompt = "Your name is BankBot. You are a helpful bank management chatbot. Assist users with their banking needs, such as account information, transactions, and financial advice.";

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    displayMessage('User', userInput);

    document.getElementById('user-input').value = '';

    const payload = {
        contents: [
            {
                parts: [
                    { text: userInput }
                ]
            }
        ]
    };

    try {
        const response = await fetch(`${url}?key=${my_chabhi}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {

            displayMessage('Bot', data.candidates[0].content.parts[0].text);
        } else {
            throw new Error('Unexpected API response structure');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Bot', 'Sorry, something went wrong.');
    }
}

function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function setupChatbot() {
    const payload = {
        contents: [
            {
                parts: [
                    { text: initialPrompt }
                ]
            }
        ]
    };

    try {
        const response = await fetch(`${url}?key=${my_chabhi}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Chatbot Setup Response:', data);
    } catch (error) {
        console.error('Error setting up chatbot:', error);
    }
}

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

setupChatbot();