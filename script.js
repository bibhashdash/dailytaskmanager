const container = document.querySelector(".container");
const newTaskInput = document.querySelector(".btn-newtask");
const form = document.getElementById("form");
const form2 = document.getElementById("form2");
const modalBackground = document.querySelector(".modal-background");
modalBackground.addEventListener("click", function() {
    document.querySelector(".modal-background").classList.add("hidden");
    document.querySelector(".modal").classList.add("hidden");
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
        <div class="btn-finished"><i class="far fa-check-square"></i></div>
        
        <div class="btn-undofinished hidden"><i class="fas fa-undo-alt"></i></div>
    <div class="btn-delete"><i class="far fa-trash-alt"></i></div><div class="btn-edit"><i class="far fa-edit"></i></div>`;
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
                document.querySelector(".modal").classList.remove("hidden");
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
                        document.querySelector(".modal").classList.add("hidden");
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

// share the list

document
    .querySelector(".btn-share-list")
    .addEventListener("click", async() => {
        try {
            let sharedListString = "";
            const sharedList = document.querySelectorAll(".task-text");
            sharedList.forEach(function(target) {
                sharedListString += target.textContent + "+";
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