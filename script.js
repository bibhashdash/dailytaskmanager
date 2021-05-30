const container = document.querySelector(".container");
const newTaskInput = document.querySelector(".btn-newtask");
const form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let inputFieldValue = document.querySelector(".enter-task-field").value;
    if (inputFieldValue !== "") {
        taskSlot = document.createElement("div");
        taskSlot.classList.add("task-slot");
        taskSlot.innerHTML = `<p class="task-text">${inputFieldValue}</p>
        <div class="btn-finished"><i class="far fa-check-square"></i></i></div>
    <div class="btn-delete"><i class="far fa-trash-alt"></i></div>`;

        container.appendChild(taskSlot);
        form.reset();
        // when task is clicked, turn it green and put a line-through

        const taskFinishedbtns = document.querySelectorAll(".btn-finished");
        for (let l = 0; l < taskFinishedbtns.length; l++) {
            taskFinishedbtns[l].addEventListener("click", function() {
                this.parentElement.classList.add("task-finished");
            });
        }
        // const taskList = document.querySelectorAll(".task-text");
        // for (let i = 0; i < taskList.length; i++) {
        //     taskList[i].addEventListener("click", function() {
        //         this.classList.add("task-finished");
        //     });
        // }

        // when delete button is clicked, remove the task
        const deleteBtns = document.querySelectorAll(".btn-delete");
        for (let j = 0; j < deleteBtns.length; j++) {
            deleteBtns[j].addEventListener("click", function() {
                this.parentNode.remove();
            });
        }
    } else {
        alert("No value entered. Try again!");
    }
});

// refresh the list
document
    .querySelector(".btn-reset-list")
    .addEventListener("click", function() {
        form.reset();
        const taskSlots = document.querySelectorAll(".task-slot");
        for (let k = 0; k < taskSlots.length; k++) {
            taskSlots[k].remove();
        }
    });