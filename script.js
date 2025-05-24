/**
 * Chat Interface JavaScript
 * This script handles the chat functionality including:
 * - Capturing user input
 * - Displaying messages
 * - Simulating bot responses
 * - Auto-scrolling
 * - Theme switching
 */

// DOM Elements
const messagesContainer = document.getElementById("messages-container");
const messageForm = document.getElementById("message-form");
const userInput = document.getElementById("user-input");
const themeButtons = document.querySelectorAll(".theme-btn");

// Chat state
let isWaitingForResponse = false;

/**
 * Initialize the chat interface
 */
function initChat() {
  messageForm.addEventListener("submit", handleSubmit);
  initThemeSystem();
  scrollToBottom();
}

/**
 * Initialize theme system
 */
function initThemeSystem() {
  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("chat-theme") || "light";
  setTheme(savedTheme);

  // Add event listeners to theme buttons
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      setTheme(theme);
      localStorage.setItem("chat-theme", theme);
    });
  });
}

/**
 * Set the current theme
 * @param {string} theme - The theme name
 */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  // Update active button
  themeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === theme);
  });
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
  } else if (lowerCaseMessage.includes("theme")) {
    return "I see you're interested in themes! You can switch between Light, Dark, Gradient, and High Contrast themes using the buttons in the header.";
  } else if (lowerCaseMessage.includes("thank")) {
    return "You're welcome! Is there anything else you'd like to know?";
  } else if (lowerCaseMessage.includes("depressed")) {
    return "I'm really sorry you're feeling this way. You're not alone, and how you're feeling is valid. If you’d like to talk about what’s on your mind, I’m here to listen — no pressure, no judgment.Also, if things feel overwhelming, it might help to reach out to a mental health professional. You deserve support.";
  } else if (lowerCaseMessage.includes("bye")) {
    return "Goodbye! Feel free to return if you have more questions.";
  } else if (lowerCaseMessage.includes("struggling")) {
    return "I'm really sorry to hear that. It’s okay to struggle — it doesn’t make you weak, it makes you human. You don’t have to carry it all alone. If you want to talk about what’s going on, I’m here to listen. Just take your time";
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
