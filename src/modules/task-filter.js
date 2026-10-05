// import functions we need from task-management.js
import { createTaskElement, taskListArr, taskListContainer } from './task-management.js'; 

// get the filter buttons from the DOM
const allTasks = document.getElementById('all-tasks');
const completedTasks = document.getElementById('completed-tasks');
const uncompletedTasks = document.getElementById('uncompleted-tasks');

// add event listeners to the filter buttons
allTasks.addEventListener('click', () => filterTasks(allTasks));
completedTasks.addEventListener('click', () => filterTasks(completedTasks));
uncompletedTasks.addEventListener('click', () => filterTasks(uncompletedTasks));

// filter tasks based on the filter type
function filterTasks(filterType) {
    let tasksToRender = taskListArr;

    // verify which filter button was clicked and filter the tasks accordingly
    if (filterType === completedTasks) {
        // filter the tasks to only include completed tasks
        tasksToRender = taskListArr.filter((task) => task.completed); 
    } else if (filterType === uncompletedTasks) {
        // filter the tasks to only include uncompleted tasks
        tasksToRender = taskListArr.filter((task) => !task.completed); 
    }

    // clear the task list container before rendering the filtered tasks
    taskListContainer.innerHTML = '';

    // check if there are no tasks to render and show a message if needed
    if (tasksToRender.length === 0) {
        console.log('No tasks to render');
        return;
    }

    // render the filtered tasks or all tasks if the "All" button was clicked
    tasksToRender.forEach((task) => {
        createTaskElement(task);
    });
}