// Get references to HTML elements
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addButton = document.getElementById('add-button');
const voiceInputButton = document.getElementById('voice-input-button');

// Add a new todo item when the "Add" button is clicked
addButton.addEventListener('click', () => {
    addTodoItem(newTodoInput.value);
});

// Initialize Web Speech API SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = 'en-US';

// Event handler for voice input
voiceInputButton.addEventListener('click', () => {
    recognition.start();
});

recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    newTodoInput.value = voiceText;
};

// Function to add a new todo item
function addTodoItem(text) {
    if (text.trim() !== '') {
        const li = document.createElement('li');
        const todoText = document.createElement('span');
        todoText.textContent = text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';

        // Event listener to edit the todo item
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit the todo item:', text);
            if (newText !== null && newText.trim() !== '') {
                todoText.textContent = newText;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        // Event listener to delete the todo item
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
        });

        li.appendChild(todoText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);

        newTodoInput.value = ''; // Clear the input field
    }
}

// dark mode
const body = document.body;
const toggleModeButton = document.getElementById('toggle-mode');
let isDarkMode = localStorage.getItem('darkMode') === 'enabled';

// Function to toggle between dark and light modes
function toggleMode() {
    if (isDarkMode) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

// Function to enable dark mode
function enableDarkMode() {
    body.classList.add('dark-mode');
    toggleModeButton.textContent = 'Light Mode';
    localStorage.setItem('darkMode', 'enabled');
    isDarkMode = true;
}

// Function to enable light mode
function enableLightMode() {
    body.classList.remove('dark-mode');
    toggleModeButton.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', null);
    isDarkMode = false;
}

// Event listener for the mode toggle button
toggleModeButton.addEventListener('click', toggleMode);

// Apply the saved mode on page load
if (isDarkMode) {
    enableDarkMode();
}