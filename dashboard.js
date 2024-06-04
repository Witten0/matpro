document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
    }

    document.getElementById('create-class').addEventListener('click', function () {
        const className = prompt('Indtast klassens navn:');
        if (className) {
            fetch('/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: className })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadClasses();
                } else {
                    alert('Failed to create class');
                }
            });
        }
    });

    document.getElementById('assign-task').addEventListener('click', function () {
        const taskType = document.getElementById('task-type').value;
        const difficulty = document.getElementById('difficulty').value;
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ taskType, difficulty })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Task assigned');
            } else {
                alert('Failed to assign task');
            }
        });
    });

    function loadClasses() {
        fetch('/api/classes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            const classContainer = document.getElementById('classes');
            classContainer.innerHTML = '';
            data.classes.forEach(cls => {
                const classElement = document.createElement('div');
                classElement.textContent = cls.name;
                classContainer.appendChild(classElement);
            });
        });
    }

    loadClasses();
});
