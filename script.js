const container = document.querySelector(".container");
const newTaskInput = document.querySelector(".btn-newtask");
const form = document.getElementById("form");
const form2 = document.getElementById("form2");
const modalBackground = document.querySelector(".modal-background");

const bigButton = document.querySelectorAll(".big-button");
modalBackground.addEventListener("click", function() {
    document.querySelector(".modal-background").classList.add("hidden");
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector("#edit-task-modal").classList.add("hidden");
});

form.addEventListener("submit", function(event) {
    //enter a new task
    event.preventDefault();
    let inputFieldValue = document.querySelector(".enter-task-field").value;
    //check if not a blank input
    if (inputFieldValue !== "") {
        taskSlot = document.createElement("div");
        taskSlot.classList.add("task-slot");
        taskSlot.innerHTML = `<p class="task-text">${inputFieldValue}</p>
        <div class="btn-finished"><i class="far fa-check-square btn-task-action"></i></div>
        
        <div class="btn-undofinished hidden"><i class="fas fa-undo-alt btn-task-action"></i></div>
    <div class="btn-delete"><i class="far fa-trash-alt btn-task-action"></i></div><div class="btn-edit"><i class="far fa-edit btn-task-action"></i></div>`;
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

                // when 'task finished' button is clicked, show the undo-taskfinished button so that user can reset if required.
                el1.nextElementSibling.classList.remove("hidden");
                el1.parentElement.lastChild.classList.add("hidden");
            });
        });

        // when edit button is clicked allow user to edit the task
        const edittaskbtns = document.querySelectorAll(".btn-edit");

        edittaskbtns.forEach(function(el4) {
            el4.addEventListener("click", function() {
                document.querySelector(".modal-background").classList.remove("hidden");
                document.querySelector("#edit-task-modal").classList.remove("hidden");
                let editFieldValue = document.querySelector("#modal-edit-field");
                editFieldValue.value = el4.parentElement.firstChild.textContent;
                form2.addEventListener("submit", function(event2) {
                    event2.preventDefault();
                    if (editFieldValue.value === "") {
                        showWarnings("modal-warning");
                        return false;
                    } else {
                        el4.parentElement.firstChild.textContent = editFieldValue.value;
                        document.querySelector(".modal-background").classList.add("hidden");
                        document.querySelector("#edit-task-modal").classList.add("hidden");
                        showWarnings("task-edited");
                    }
                });
            });
        });

        // when 'undo task finished' button is clicked
        // reinstate the task
        const undotaskfinishedbtns = document.querySelectorAll(".btn-undofinished");
        undotaskfinishedbtns.forEach(function(el3) {
            el3.addEventListener("click", function() {
                el3.parentElement.classList.remove("task-slot-finished");
                el3.classList.add("hidden");
                el3.previousElementSibling.classList.remove("hidden-alt");
                showWarnings("task-reinstated");
                el3.parentElement.firstChild.classList.remove("task-finished");
                el3.parentElement.lastChild.classList.remove("hidden");
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
        // microinteractions for task-action buttons
        const btnTaskActions = document.querySelectorAll(".btn-task-action");
        btnTaskActions.forEach(function(el5) {
            el5.addEventListener("mouseover", function() {
                el5.style.transform = "rotate(360deg)";
                el5.style.transitionDuration = "0.5s";
            });
            el5.addEventListener("mouseout", function() {
                el5.style.transform = "rotate(-360deg)";
            });
        });
    } else {
        // If user clicks 'add to list' without entering any value
        // show a message saying 'no value entered', make it disappear after 2 seconds.
        showWarnings("no-value-warning");
    }
});

// clear the list
document
    .querySelector(".btn-reset-list")
    .addEventListener("click", function() {
        // show a modal with a warning asking
        // if user is sure about clearing list
        document.querySelector(".modal-background").classList.remove("hidden");
        document.querySelector(".are-you-sure-modal").classList.remove("hidden");
        document
            .querySelector(".clear-list-yes")
            .addEventListener("click", function() {
                form.reset();
                const taskSlots = document.querySelectorAll(".task-slot");
                for (let k = 0; k < taskSlots.length; k++) {
                    taskSlots[k].remove();
                }
                document.querySelector(".modal-background").classList.add("hidden");
                document.querySelector(".are-you-sure-modal").classList.add("hidden");
            });

        document
            .querySelector(".clear-list-no")
            .addEventListener("click", function() {
                document.querySelector(".modal-background").classList.add("hidden");
                document.querySelector(".are-you-sure-modal").classList.add("hidden");
            });
    });

// warning messages function

function showWarnings(warningMessage) {
    document.querySelector(`.${warningMessage}`).classList.remove("hidden");
    setTimeout(() => {
        document.querySelector(`.${warningMessage}`).classList.add("hidden");
    }, 2000);
}

// share the list

document
    .querySelector(".btn-share-list")
    .addEventListener("click", async() => {
        try {
            let sharedListString = "List of tasks \n";
            const sharedList = document.querySelectorAll(".task-text");
            sharedList.forEach(function(target) {
                sharedListString += target.textContent + "\n";
            });
            const sharedListObject = {
                text: sharedListString,
            };
            await navigator.share(sharedListObject);
            console.log(sharedListObject);
        } catch (error) {
            alert("Could not share");
        }
    });

// big button microinteractions
bigButton.forEach(function(el6) {
    el6.addEventListener("mouseover", function() {
        el6.style.transform = "scale(1.3, 1.3)";
        el6.style.transitionDuration = "0.3s";
    });
    el6.addEventListener("mouseout", function() {
        el6.style.transform = "scale(1, 1)";
        el6.style.transitionDuration = "0.3s";
    });
});