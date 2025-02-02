// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the necessary DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get the task text from the input field
        const taskText = taskInput.value.trim();

        // Check if the input field is not empty
        if (taskText !== "") {
            // Create a new list item for the task
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            // Create a remove button for the task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            // Add an event listener to remove the task when the button is clicked
            removeButton.addEventListener('click', function() {
                taskList.removeChild(newTask);
            });

            // Append the remove button to the task item
            newTask.appendChild(removeButton);

            // Append the new task to the task list
            taskList.appendChild(newTask);

            // Clear the input field after adding the task
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for the Enter key to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
