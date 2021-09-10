const container = document.querySelector(".container");
const newTaskInput = document.querySelector(".btn-newtask");
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    //enter a new task
    event.preventDefault();
    let inputFieldValue = document.querySelector(".enter-task-field").value;
    //check if not a blank input
    if (inputFieldValue !== "") {
        taskSlot = document.createElement("div");
        taskSlot.classList.add("task-slot");
        taskSlot.innerHTML = `<p class="task-text">${inputFieldValue}</p>
        <div class="btn-finished"><i class="far fa-check-square"></i></i></div>
    <div class="btn-delete"><i class="far fa-trash-alt"></i></div>`;
        container.appendChild(taskSlot);
        // show a message saying task added, make it disappear after 2 seconds.
        showWarnings("task-added");

        // After clicking 'add to list' clear the input field
        form.reset();

        // when task finished button (green check mark) is clicked, put a line-through the task text
        const taskFinishedbtns = document.querySelectorAll(".btn-finished");
        taskFinishedbtns.forEach(function(el1) {
            el1.addEventListener("click", function() {
                el1.previousElementSibling.classList.add("task-finished");
                el1.parentElement.classList.add("task-slot-finished");
                el1.classList.add("hidden-alt");

                // show a message saying task finished, make it disappear after 2 seconds.
                showWarnings("success");
            });
        });

        // when delete button is clicked, remove the task
        const deleteBtns = document.querySelectorAll(".btn-delete");
        deleteBtns.forEach(function(el2) {
            el2.addEventListener("click", function() {
                el2.parentNode.remove();

                // show a message saying task deleted, make it disappear after 2 seconds.
                showWarnings("task-deleted");
            });
        });
    } else {
        // If user clicks 'add to list' without entering any value
        // show a message saying 'no value entered', make it disappear after 2 seconds.
        showWarnings("no-value-warning");
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

// warning messages function

function showWarnings(warningMessage) {
    document.querySelector(`.${warningMessage}`).classList.remove("hidden");
    setTimeout(() => {
        document.querySelector(`.${warningMessage}`).classList.add("hidden");
    }, 2000);
}