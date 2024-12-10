const API_KEY = 'AIzaSyCaGDKCTrNqx5uICnWxAJlfimr1Xzhuqvc'; // Replace with your actual API key
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display user message
    displayMessage('User', userInput);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Prepare the request payload
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
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
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

        // Check if data.candidates and data.candidates[0].content.parts exist
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            // Display the response message
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
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}