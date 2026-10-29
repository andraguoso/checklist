const add = document.getElementById("add-task");
const token = document.getElementById("first-task");
const del = document.querySelectorAll(".delete");
add.onclick = function () {
    const newTask = token.cloneNode(1);
    add.before(newTask);
}
del.forEach(function (button) {
    button.onclick = function () {
        button.parentElement.remove();
    }
});