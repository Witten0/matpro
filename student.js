document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
    }

    function loadTasks() {
        fetch('/api/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const taskContainer = document.getElementById('tasks');
            taskContainer.innerHTML = '';
            data.tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.textContent = `${task.taskType} (Sværhedsgrad: ${task.difficulty})`;
                taskContainer.appendChild(taskElement);
            });
        });
    }

    loadTasks();
});
