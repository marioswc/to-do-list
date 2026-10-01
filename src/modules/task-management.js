// get the tasks from localStorage and parse them into an array or create an empty array
export const taskListArr = JSON.parse(localStorage.getItem('tasks')) || [];
// set initial state for the action buttons
let isEditing = false;
// get elements for task's
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const btnAddTask = document.getElementById('addTask');
const taskListContainer = document.getElementById('taskList');
const noTasksMessage = document.getElementById('noTasksMessage');

// event listener for the task form submit
taskForm.addEventListener('submit', (e) => {
    // prevent refresh page on form submit
    e.preventDefault();
    // assign the value of the task input field into a var and verify if isn't empty
    const taskName = taskInput.value.trim();
    if (taskName === '') return;
    // check if the user is editing or adding a new task
    if (!isEditing) {
        // create and object to store the task data
        const taskObject = { id: Date.now(), name: taskName, completed: false };
        // adding task
        createTaskElement(taskObject);
        // save the task to localStorage
        saveToLocalStorage(taskObject);
        // verify taskListArr emptiness to show/hide an message
        checkEmptyTaskList();
        // debugging
        // console.log('adding task');
    } else {
        // editing task
        updateTaskName(taskName, Number(taskForm.dataset.form));
        // debugging
        // console.log('editing task');
        // console.log('editing task with ', taskForm.dataset.taskId)
    }
    // debugging
    // console.log('current state is:' , isEditing);
});

export function createTaskElement(task) {
    // create elements for the task render
    const taskContainer = document.createElement('div');
    const taskCheckContainer = document.createElement('div');
    const taskTextContainer = document.createElement('div');
    const taskActionsContainer = document.createElement('div');
    const taskTextElement = document.createElement('p');
    // create button actions for the task
    const taskBtnCheckbox = document.createElement('input');
    const taskBtnEdit = document.createElement('button');
    const taskBtnCancel = document.createElement('button');
    const taskBtnDelete = document.createElement('button');
    // set attributes and classNames for the task elements
    taskContainer.className = 'w-full flex items-center justify-between gap-2 py-2 border border-gray-300 rounded-md';
    // set the data attribute to the taskContainer with the task id
    taskContainer.setAttribute('data-taskContainer', task.id);
    taskCheckContainer.className = 'ml-2';
    taskActionsContainer.className = 'flex items-center gap-2 mr-2';
    taskTextElement.className = 'text-sm text-(--text)';
    taskBtnCheckbox.className = 'flex cursor-pointer w-4 h-4 select-task';
    taskBtnCheckbox.setAttribute('type', 'checkbox');
    taskBtnEdit.className = 'cursor-pointer text-sm text-(--text) px-2 border border-gray-300 rounded-sm bg-gray-50 hover:bg-gray-300 transition-all duration-300 ease-in-out btn-edit';
    taskBtnEdit.innerText = 'Edit';
    taskBtnCancel.className = 'hidden cursor-pointer text-sm text-(--text) px-2 border border-gray-300 rounded-sm bg-gray-50 hover:bg-gray-300 transition-all duration-300 ease-in-out btn-cancel';
    taskBtnCancel.innerText = 'Cancel';
    taskBtnDelete.className = 'cursor-pointer text-sm text-(--text) hover:text-gray-300 transition-all duration-300 ease-in-out btn-delete';
    taskBtnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM428.5-291.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5ZM280-720v520-520Z"/></svg>';
    // set the task name to the task text element
    taskTextElement.innerText = task.name;

    // verify if the task is completed and set the checkbox and text style accordingly
    if (task.completed) {
        taskBtnCheckbox.checked = true;
        taskTextElement.className = 'text-sm line-through text-gray-400';
    }

    // append the elements to the each task container
    taskCheckContainer.appendChild(taskBtnCheckbox);
    taskTextContainer.appendChild(taskTextElement);
    taskActionsContainer.appendChild(taskBtnEdit);
    taskActionsContainer.appendChild(taskBtnCancel);
    taskActionsContainer.appendChild(taskBtnDelete);
    // append each container to taskContainer
    taskContainer.appendChild(taskCheckContainer);
    taskContainer.appendChild(taskTextContainer);
    taskContainer.appendChild(taskActionsContainer);
    // append everything to the taskListContainer
    taskListContainer.appendChild(taskContainer);
    // after creating, reset the input field to empty
    taskInput.value = '';
    // unfocus the input field after adding a task
    taskInput.blur();

    // create event listener for task actions
    taskBtnCheckbox.addEventListener('change', () => {
        // set the taskText and taskId to the current task text and id
        completeTask(taskTextElement, task.id);
    });

    taskBtnEdit.addEventListener('click', () => {
        // avoid editing multiple task at the same time
        if (isEditing === true) return;
        // update the state to editing and set taskForm id from the current task
        isEditing = true;
        // set the data attribute to the taskForm with the task id
        taskForm.setAttribute('data-form', task.id);
        // set current name and input value to the task name
        taskInput.value = task.name;
        editTask(task.id);
    });

    taskBtnCancel.addEventListener('click', () => {
        // reset the state to default
        resetState(task.id);
    });

    taskBtnDelete.addEventListener('click', () => {
        // set the taskId to the current task id
        deleteTask(taskContainer, task.id);
    });
}

function completeTask(taskText, taskId) {
    // find the task by ID and toggle its completed state in the taskListArr
    const taskToUse = findTaskById(taskId);
    // toggle the completed state of the task in the taskListArr
    taskListArr[taskToUse].completed = !taskListArr[taskToUse].completed;
    // update localStorage with the new completed state
    updateLocalStorage();
    // toggle the completed class on the task text element
    taskText.classList.toggle('line-through');
    taskText.classList.toggle('text-gray-400');
    // debugging
    // console.log('completing task:', taskToUse, 'from:', taskListArr, 'with ID:', taskId, 'is completed:', taskListArr[taskToUse].completed);
}

function editTask(taskId) {
    // find the buttons element of the task text
    const taskContainer = document.querySelector(`[data-taskContainer="${taskId}"]`);
    const btnCheckbox = taskContainer.querySelector('input[type="checkbox"]');
    const btnEdit = taskContainer.querySelector('.btn-edit');
    const btnCancel = taskContainer.querySelector('.btn-cancel');
    const btnDelete = taskContainer.querySelector('.btn-delete');
    // focus the input field while editing the task
    taskInput.focus();
    // change the buttons to show cancel and hide edit button
    btnCancel.classList.remove('hidden');
    btnEdit.classList.add('hidden');
    // disable buttons while editing the task
    btnDelete.disabled = true;
    if (btnDelete.disabled === true) btnDelete.classList.add('text-gray-300');
    btnCheckbox.disabled = true;
    // update the add button text to 'Update'
    btnAddTask.innerText = 'Save';
}

function updateTaskName(newTaskName, taskId) {
    // find the p element of the task text
    const taskContainer = document.querySelector(`[data-taskContainer="${taskId}"]`);
    const taskText = taskContainer.querySelector('p');
    // find the task by ID and update its name in the taskListArr
    const taskToUse = findTaskById(taskId);
    taskListArr[taskToUse].name = newTaskName;
    taskText.innerText = newTaskName;
    // update localStorage with the new task name
    updateLocalStorage();
    // reset the state after updating the task name
    resetState(taskId);
}

function deleteTask(taskContainer, taskId) {
    // find the task by ID and remove it from the taskListArr
    const taskToUse = findTaskById(taskId);
    // remove the task from the taskListArr
    taskListArr.splice(taskToUse, 1);
    // remove the task from the DOM
    taskContainer.remove();
    // update localStorage after deleting the task
    updateLocalStorage();
    // verify taskListArr emptiness to show/hide an message
    checkEmptyTaskList();
    // debugging
    // console.log('deleting task:', taskToUse, 'from: ', taskListArr, 'with ID: ', taskId);
}

function resetState(taskId) {
    // find the buttons element of the task text
    const taskContainer = document.querySelector(`[data-taskContainer="${taskId}"]`);
    const btnCheckbox = taskContainer.querySelector('.select-task');
    const btnEdit = taskContainer.querySelector('.btn-edit');
    const btnCancel = taskContainer.querySelector('.btn-cancel');
    const btnDelete = taskContainer.querySelector('.btn-delete');
    // hide the cancel and show edit button
    btnCancel.classList.add('hidden');
    btnEdit.classList.remove('hidden');
    // enable buttons after editing the task
    btnDelete.disabled = false;
    if (btnDelete.disabled === false) btnDelete.classList.remove('text-gray-300');
    btnCheckbox.disabled = false;
    // after, reset all states to default
    isEditing = false;
    // delete the id from the taskForm dataset to avoid editing the same task again
    delete taskForm.dataset.form;
    // finally update and unfocus the input field and add button text
    taskInput.value = '';
    taskInput.blur();
    btnAddTask.innerText = 'Add';
}

function findTaskById(taskId) {
    // find the position of taskId in the taskListArr
    const taskToUse = taskListArr.findIndex((task) => taskId === task.id);
    // debugging
    // console.log('finding task by ID:', taskId, 'from: ', taskListArr, 'in position: ', taskToUse);
    return taskToUse;
}

function saveToLocalStorage(task) {
    // push the taskObject into the taskArray
    taskListArr.push(task);
    // save taskArray in locaLStorage
    localStorage.setItem('tasks', JSON.stringify(taskListArr));
    // debugging  
    // console.log(taskListArr, localStorage.getItem('tasks'));
}

function updateLocalStorage() {
    // update the task in localStorage
    localStorage.setItem('tasks', JSON.stringify(taskListArr));
    // debugging
    // console.log(taskListArr);
}

export function checkEmptyTaskList(){
    if (taskListArr.length === 0) {
        noTasksMessage.classList.remove('hidden');
    }else{
        noTasksMessage.classList.add('hidden');
    }
}