/**
 * Chat Interface JavaScript
 * This script handles the chat functionality including:
 * - Capturing user input
 * - Displaying messages
 * - Simulating bot responses
 * - Auto-scrolling
 */

// DOM Elements
const messagesContainer = document.getElementById("messages-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");

// Chat state
let isWaitingForResponse = false;

/**
 * Initialize the chat interface
 */
function initChat() {
  messageForm.addEventListener("submit", handleSubmit);
  scrollToBottom();
}

/**
 * Handle form submission
 * @param {Event} event - The form submission event
 */
function handleSubmit(event) {
  event.preventDefault();

  const message = userInput.value.trim();
  if (message === "" || isWaitingForResponse) return;

  // Display user message
  addMessage(message, "user");

  // Clear input field
  userInput.value = "";

  // Show typing indicator and fetch bot response
  showTypingIndicator();
  fetchBotResponse(message);
}

/**
 * Add a message to the chat
 * @param {string} content - The message content
 * @param {string} sender - The message sender ('user' or 'bot')
 */
function addMessage(content, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", `${sender}-message`);

  const messageContent = document.createElement("div");
  messageContent.classList.add("message-content");

  const paragraph = document.createElement("p");
  paragraph.textContent = content;

  messageContent.appendChild(paragraph);
  messageElement.appendChild(messageContent);
  messagesContainer.appendChild(messageElement);

  scrollToBottom();
}

/**
 * Show typing indicator while waiting for bot response
 */
function showTypingIndicator() {
  isWaitingForResponse = true;

  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("message", "bot-message", "typing-indicator");
  typingIndicator.id = "typing-indicator";

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    typingIndicator.appendChild(dot);
  }

  messagesContainer.appendChild(typingIndicator);
  scrollToBottom();
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
  isWaitingForResponse = false;
}

/**
 * Fetch bot response (placeholder function)
 * This would be replaced with actual API call in production
 * @param {string} userMessage - The user's message
 */
function fetchBotResponse(userMessage) {
  // Simulate API delay
  setTimeout(() => {
    // Remove typing indicator
    removeTypingIndicator();

    // In a real implementation, this would be an API call
    // For example:
    // const response = await fetch('/api/chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ message: userMessage })
    // });
    // const data = await response.json();
    // addMessage(data.message, 'bot');

    // For demo, generate a simple response
    const botResponse = generateMockResponse(userMessage);
    addMessage(botResponse, "bot");
  }, 1500); // Simulate network delay
}

/**
 * Generate a mock response (placeholder function)
 * This would be replaced with actual API response in production
 * @param {string} userMessage - The user's message
 * @returns {string} - A mock response
 */
function generateMockResponse(userMessage) {
  const lowerCaseMessage = userMessage.toLowerCase();

  if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
    return "Hello there! How can I assist you today?";
  } else if (lowerCaseMessage.includes("help")) {
    return "I'm here to help! What do you need assistance with?";
  } else if (lowerCaseMessage.includes("thank")) {
    return "You're welcome! Is there anything else you'd like to know?";
  } else if (lowerCaseMessage.includes("bye")) {
    return "Goodbye! Feel free to return if you have more questions.";
  } else {
    return "That's interesting. Can you tell me more about that?";
  }
}

/**
 * Scroll to the bottom of the messages container
 */
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initialize the chat when the DOM is loaded
document.addEventListener("DOMContentLoaded", initChat);
