// set initial state for the action buttons
let isEditing = false;
let currentTaskName = null;
let btnCancel = null;
let btnEdit = null;
let btnDelete = null;
let btnCheckbox = null;
// get elements for task's
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const btnAddTask = document.getElementById('addTask');
const taskListContainer = document.getElementById('taskList');

// event listener for the task form submit
taskForm.addEventListener('submit', (e) => {
    // prevent refresh page on form submit
    e.preventDefault();
    // assign the value of the task input field into a var and verify if isn't empty
    const taskName = taskInput.value.trim();
    if (taskName === '') return;
    // check if the user is editing or adding a new task
    if (!isEditing){
        // adding task
        createTaskElement(taskName);
        // debugging
        // console.log('adding task');
    }else{
        // editing task
        updateTaskName(taskName);
        // debugging
        // console.log('editing task');
    }
    // debugging
    // console.log('current state is:' , isEditing);
});

function createTaskElement(taskName){
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
    taskCheckContainer.className = 'ml-2';
    taskActionsContainer.className = 'flex items-center gap-2 mr-2';
    taskTextElement.className = 'text-sm text-(--text)';
    taskBtnCheckbox.className = 'flex cursor-pointer w-4 h-4';
    taskBtnCheckbox.setAttribute('type', 'checkbox');
    taskBtnEdit.className = 'cursor-pointer text-sm text-(--text) px-2 border border-gray-300 rounded-sm bg-gray-50 hover:bg-gray-300 transition-all duration-300 ease-in-out';
    taskBtnEdit.innerText = 'Edit';
    taskBtnCancel.className = 'hidden cursor-pointer text-sm text-(--text) px-2 border border-gray-300 rounded-sm bg-gray-50 hover:bg-gray-300 transition-all duration-300 ease-in-out';
    taskBtnCancel.innerText = 'Cancel';
    taskBtnDelete.className = 'cursor-pointer text-sm text-(--text) hover:text-gray-300 transition-all duration-300 ease-in-out';
    taskBtnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM428.5-291.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5ZM280-720v520-520Z"/></svg>';
    // set the task name to the task text element
    taskTextElement.innerText = taskName;
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
        completeTask(taskTextElement);
    });

    taskBtnEdit.addEventListener('click', () => {
        // avoid editing multiple task at the same time
        if (isEditing) return;
        // update the state to editing
        isEditing = true;
        // set current name and input value to the task name
        currentTaskName = taskTextElement;
        taskInput.value = taskTextElement.innerText;
        // set the buttons to the current task buttons
        btnCancel = taskBtnCancel;
        btnEdit = taskBtnEdit;
        btnCheckbox = taskBtnCheckbox;
        btnDelete = taskBtnDelete;
        editTask();
    });

    taskBtnCancel.addEventListener('click', () => {
        resetState();
    });

    taskBtnDelete.addEventListener('click', () => {
        deleteTask(taskContainer);
    });
}

function completeTask(taskTextElement){
    // toggle the completed class on the task text element
    taskTextElement.classList.toggle('line-through');
    taskTextElement.classList.toggle('text-gray-400');
}

function editTask(){
    // focus the input field while editing the task
    taskInput.focus();
    // change the buttons to show cancel and hide edit button
    btnCancel.classList.remove('hidden');
    btnEdit.classList.add('hidden');
    // disable buttons while editing the task
    btnDelete.disabled = true;
    if (btnDelete.disabled === true){
        btnDelete.classList.add('text-gray-300');
    }
    btnCheckbox.disabled = true;
    // update the add button text to 'Update'
    btnAddTask.innerText = 'Save';
}

function updateTaskName(taskName){
    currentTaskName.innerText = taskName;
    // reset the state after updating the task name
    resetState();
}

function resetState(){
    // hide the cancel and show edit button
    btnCancel.classList.add('hidden');
    btnEdit.classList.remove('hidden');
    // enable buttons after editing the task
    btnDelete.disabled = false;
    if (btnDelete.disabled === false){
        btnDelete.classList.remove('text-gray-300');
    }
    btnCheckbox.disabled = false;
    // after, reset all states to default
    isEditing = false;
    currentTaskName = null;
    btnCancel = null;
    btnEdit = null;
    btnCheckbox = null;
    btnDelete = null;
    // finally update and unfocus the input field and add button text
    taskInput.value = '';
    taskInput.blur();
    btnAddTask.innerText = 'Add';
}

function deleteTask(taskContainer){
    taskContainer.remove();
}