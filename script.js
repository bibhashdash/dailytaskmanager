const container = document.querySelector(".container");
const newTaskInput = document.querySelector(".btn-newtask");
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    //enter a new task
    event.preventDefault();
    let inputFieldValue = document.querySelector(".enter-task-field").value;
    //check if blank input
    if (inputFieldValue !== "") {
        taskSlot = document.createElement("div");
        taskSlot.classList.add("task-slot");
        taskSlot.innerHTML = `<p class="task-text">${inputFieldValue}</p>
        <div class="btn-finished"><i class="far fa-check-square"></i></i></div>
    <div class="btn-delete"><i class="far fa-trash-alt"></i></div>`;

        // show a message saying task added, make it disappear after 2 seconds.
        container.appendChild(taskSlot);
        document.querySelector(".task-added").classList.remove("hidden");
        setTimeout(() => {
            document.querySelector(".task-added").classList.add("hidden");
        }, 2000);

        // After clicking 'add to list' clear the input field
        form.reset();

        // when task finished button (green check mark) is clicked, put a line-through the task text

        const taskFinishedbtns = document.querySelectorAll(".btn-finished");
        for (let l = 0; l < taskFinishedbtns.length; l++) {
            taskFinishedbtns[l].addEventListener("click", function() {
                this.previousElementSibling.classList.add("task-finished");
                this.parentElement.classList.add("task-slot-finished");
                this.classList.add("hidden-alt");
                document.querySelector(".success").classList.remove("hidden");
                setTimeout(() => {
                    document.querySelector(".success").classList.add("hidden");
                }, 2000);
            });
        }

        // when delete button is clicked, remove the task
        const deleteBtns = document.querySelectorAll(".btn-delete");
        for (let j = 0; j < deleteBtns.length; j++) {
            deleteBtns[j].addEventListener("click", function() {
                this.parentNode.remove();
                document.querySelector(".task-deleted").classList.remove("hidden");
                setTimeout(() => {
                    document.querySelector(".task-deleted").classList.add("hidden");
                }, 2000);
            });
        }
    } else {
        document.querySelector(".warning").classList.remove("hidden");
        setTimeout(() => {
            document.querySelector(".warning").classList.add("hidden");
        }, 2000);
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