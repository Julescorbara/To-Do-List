AddTaskField = document.getElementById('input-task')
AddTaskButton = document.getElementById('add-task-button');
list = document.querySelector('ul')
let TaskName = AddTaskField.value


//load tasks
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(taskList)
taskList.forEach(item => add_task(item.name,  true, item.isdone )); //on rajoute la tache)

function add_task(TaskName, imported = false, checked = false ){
    let TaskFullText
    if(checked === true){
        TaskFullText =
            '<li>\n' +
            '    <input type="checkbox" onclick=\'check_task(this, "'+TaskName+'")\'>\n' +
            '    <span class="task completed">' + TaskName + '</span>\n' +
            '    <button class="delete-btn" onclick="delete_task(this, "'+TaskName+'")\'>X</button>\n' +
            '</li>'
        }
    else{
        TaskFullText =
            '<li>\n' +
            '    <input type="checkbox" onclick=\'check_task(this, "'+TaskName+'")\'>\n' +
            '    <span class="task">' + TaskName + '</span>\n' +
            '    <button class="delete-btn" onclick=\'delete_task(this, "'+TaskName+'")\'>X</button>\n' +
            '</li>'
    }
    console.log(TaskFullText)
    list.insertAdjacentHTML('beforeend', TaskFullText); //on rajoute la tache

    if(imported===false) {
        AddTaskField.value = '' //on vide l'input
        let TaskObj = {name: TaskName, isdone: false}
        taskList.push(TaskObj)
        save_tasks()
    }
}

function save_tasks(){
    console.log(JSON.stringify(taskList))
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

function check_task(that, name){
    console.log("task name to check: "+name)
    that.parentNode.querySelector("span").classList.toggle("completed")
    taskList.forEach(item => check_item(item, name))
    save_tasks()
}

function check_item(item, name){
    if(item.name === name){
        item.isdone = !item.isdone
    }
}

function delete_task(that, name){
    console.log("task name to remove: "+name);
    that.parentNode.remove();
    taskList.forEach((item,index) => remove_item(item, index, name));
    save_tasks()
}

function remove_item(item, index, name){
    if(item.name === name){
        taskList.splice(index,1)
    }
}
