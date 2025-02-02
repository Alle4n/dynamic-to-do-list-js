document.addEventListener('DOMContentLoaded', function() {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Create a task element for each task in Local Storage
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false means don't save it to Local Storage again
        });
    }

    // Function to save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task to the list
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item for the task
        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Add an event listener to remove the task when the button is clicked
        removeButton.addEventListener('click', function() {
            // Remove the task from the DOM
            taskList.removeChild(newTask);
            // Update the task list in Local Storage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.filter(task => task !== taskText); // Remove task from array
            saveTasks(updatedTasks);
        });

        // Append the remove button to the task item
        newTask.appendChild(removeButton);
        // Append the new task to the task list
        taskList.appendChild(newTask);

        // If we need to save the task to Local Storage
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            saveTasks(tasks); // Save updated tasks to Local Storage
        }

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    // Event listener for the Enter key to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
