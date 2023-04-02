let input = document.querySelector(".input");
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")

let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}


// Trigger Get Data From Local Storage
getDataFromLocalStorage();




// Add Task
submit.onclick = function () {
if(input.value !=="") {
 addTaskToArray(input.value);   //Add Tasks To Array of Tasks
input.value ="";                //Empty input Filed
}
};








// Click on task Elment
tasksDiv.addEventListener("click", (e) =>{
    // Delete Butoon
    if (e.target.classList.contains("del")) {
        // remove Task From Local Storage
        delateTaskWith(e.target.parentElement.getAttribute("data-id"));

        //  Remove Element From page
        e.target.parentElement.remove();
    }
        // task element
        if (e.target.classList.contains("task")) {
            // toggle cmpleted for The Task
            toggleStatusTaskWith(e.target.getAttribute("data-id"));
            
        //    toggle done class
        e.target.classList.toggle("done");
            

     }
});












function addTaskToArray(taskText) {
// task data
const task ={
    id: Date.now(),
    title:taskText,
    completed:false,
};
// push Task to array of tasksrayOfTasks.push(task);
arrayOfTasks.push(task) 

// Add Tasks to Page
addElemntsToPageFrom(arrayOfTasks); 

// Add tasks to Local Storge
 addDateToLocalStorageForm(arrayOfTasks)


//  test




}


function addElemntsToPageFrom(arrayOfTasks) {
// Empty tasks Div
tasksDiv.innerHTML="";
// empty localStorage saving data
window.localStorage.removeItem("tasks")
// Looping on arary of tasks
arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div")
    div.className = "task";
    // check if Task is Done
    if (task.completed){
        div.className = "task done"
    }
    
    div.setAttribute("data-id", task.id)
    div.appendChild(document.createTextNode(task.title))
    // Create delete Button 
    let span = document.createElement("span");
    span.className="del"
    span.appendChild(document.createTextNode("Delete"))
    // Append Button To
    div.appendChild(span)

    // Add Task Div to tasks Container body
    tasksDiv.appendChild(div);
});

}




function addDateToLocalStorageForm(arrayOfTasks) {
window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}
function getDataFromLocalStorage () {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data);
        addElemntsToPageFrom(tasks)
    }
    
}


function delateTaskWith(taskId) {
    // for test Only
    // for(let i = 0; i < arrayOfTasks.length; i++) {
    //     console.log(`${arrayOfTasks[i].id} === ${taskId}`)
    // }
            //  dealate div in body and local storge
      arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
        addDateToLocalStorageForm(arrayOfTasks);
    }


    function toggleStatusTaskWith(taskId) {
        for (let i = 0; i < arrayOfTasks.length; i++) {
          if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
          }
        }
        addDateToLocalStorageForm(arrayOfTasks);
      }