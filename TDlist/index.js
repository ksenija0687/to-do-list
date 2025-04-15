const form = document.querySelector(".form");
const input = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
if(list){
    list.forEach(task => {
        todolist(task);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    todolist();
});

function todolist(task) {
    let newTask = input.value;
    if (task) {
        newTask = task.name;
    }
    const liEl = document.createElement("li");
    if(task && task.checked) {
        liEl.classList.add("checked");
    }

    liEl.innerText = newTask;
    ulEl.appendChild(liEl);
    input.value = "";

    const checkButtonElement = document.createElement("div");
    checkButtonElement.innerHTML = '<i class="fas fa-check-square"></i>';
    liEl.appendChild(checkButtonElement);
    
    const trashButtonElement = document.createElement("div");
    trashButtonElement.innerHTML = '<i class="fas fa-trash"></i>';
    liEl.appendChild(trashButtonElement);

    checkButtonElement.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashButtonElement.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });
}

function updateLocalStorage() {
    const liElements = document.querySelectorAll("li");
    list = [];
    liElements.forEach((liEl) => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        });
    });
    localStorage.setItem("list", JSON.stringify(list));
}
