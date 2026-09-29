// import all tasks from task-management.js
import { createTaskElement, taskListArr } from './task-management.js';

// render the tasks from localStorage when the page loads
renderTasksFromLocalStorage();

function renderTasksFromLocalStorage() {
    // loop through the taskListArr and create a task element for each task
    taskListArr.forEach((task) => {
        // create a task element for each task in the taskListArr
        createTaskElement(task);
        // debugging 
        // console.log('rendering task from localStorage:', task);
    });
}