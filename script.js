const container = document.querySelector(".container");
const newTaskInput = document.querySelector(".btn-newtask");

// Input a new task and display it in the list
newTaskInput.addEventListener("click", function() {
    // capture task
    const newTask = prompt("Enter a new task");
    if (newTask === "" || newTask === null) {
        alert("No task entered. Give it another go!");
    }
    // create a slot for the new Task, give it a class, and add it to container div
    else {
        const newTaskSlot = document.createElement("div");
        newTaskSlot.className = "task-slot";
        container.appendChild(newTaskSlot);

        // create a paragraph element to display the task, give it a class and add it to the new slot above
        const newTaskText = document.createElement("p");
        newTaskText.className = "task-text";
        newTaskSlot.appendChild(newTaskText);

        // create a div for the 'delete' icon, input a cross symbol, and append to the new slot above
        const deleteButton = document.createElement("div");

        deleteButton.setAttribute("class", "btn-delete");
        deleteButton.textContent = "❌";
        newTaskSlot.appendChild(deleteButton);

        // display the new task in the DOM

        newTaskText.textContent = "▶" + "   " + newTask;
    }

    // when task is clicked, turn it green and put a line-through
    const taskList = document.querySelectorAll(".task-text");
    for (let i = 0; i < taskList.length; i++) {
        taskList[i].addEventListener("click", function() {
            this.classList.toggle("task-finished");
        });
    }

    // when delete button is clicked, remove the task
    const deleteBtns = document.querySelectorAll(".btn-delete");
    for (let j = 0; j < deleteBtns.length; j++) {
        deleteBtns[j].addEventListener("click", function() {
            this.parentNode.remove();
        });
    }
});

// refresh the list
document
    .querySelector(".btn-reset-list")
    .addEventListener("click", function() {
        const taskSlots = document.querySelectorAll(".task-slot");
        for (let k = 0; k < taskSlots.length; k++) {
            taskSlots[k].remove();
        }
    });