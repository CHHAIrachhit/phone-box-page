// Get phone number from query string
function getPhoneNumberFromUrl() {
    //has flag
    const params = new URLSearchParams(window.location.search);
    return params.get('number');
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

// Mock function to generate random messages (for demo purposes)
function generateMockMessages() {
    const senders = ['Amazon', 'Google', 'Facebook', 'Twitter', 'Microsoft', 'Apple', 'WhatsApp', 'Telegram', 'Instagram', 'Bank', 'Uber', 'Airbnb'];
    const codePrefixes = ['G-', 'FB-', 'A-', 'T-', 'M-', 'U-', 'I-', 'W-', 'B-', 'C-', 'X-', 'Y-'];
    const messages = [];
    const messageCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 messages
    for (let i = 0; i < messageCount; i++) {
        const sender = senders[Math.floor(Math.random() * senders.length)];
        const codePrefix = codePrefixes[Math.floor(Math.random() * codePrefixes.length)];
        const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
        const content = `${sender === 'Bank' ? 'Your OTP is:' : 'Your verification code is:'} ${codePrefix}${code}`;
        const timestamp = new Date(Date.now() - Math.floor(Math.random() * 60 * 60 * 1000)); // within last hour
        messages.push({
            id: i + 1,
            sender,
            content,
            timestamp
        });
    }
    // Randomly decide whether to return messages or empty array
    return Math.random() > 0.2 ? messages : [];
}

// Function to render messages
function renderMessages(messages) {
    const messageListElement = document.getElementById('messageList');
    
    if (messages.length === 0) {
        messageListElement.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p>Waiting for messages...</p>
            </div>
        `;
        return;
    }

    messageListElement.innerHTML = messages.map(message => `
        <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
                <div class="font-semibold text-gray-800">${message.sender}</div>
                <div class="text-sm text-gray-500">${formatDate(message.timestamp)}</div>
            </div>
            <p class="text-gray-600">${message.content}</p>
        </div>
    `).join('');
}

// Function to copy phone number
function copyPhoneNumber() {
    const phoneNumber = document.getElementById('phoneNumber').textContent;
    navigator.clipboard.writeText(phoneNumber);
    alert('Phone number copied to clipboard');
}

// Function to refresh messages
function refreshMessages() {
    const messages = generateMockMessages();
    renderMessages(messages);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const phoneNumber = getPhoneNumberFromUrl();
    
    if (!phoneNumber) {
        window.location.href = '/';
        return;
    }

    // Set phone number in the UI
    document.getElementById('phoneNumber').textContent = phoneNumber;

    // Add event listeners
    document.getElementById('copyButton').addEventListener('click', copyPhoneNumber);
    document.getElementById('refreshButton').addEventListener('click', refreshMessages);

    // Initial load of messages
    refreshMessages();

    // Auto-refresh messages every 30 seconds
    setInterval(refreshMessages, 30000);
}); 