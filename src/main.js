// get the new task input elemnts
const taskInput = document.getElementById('taskInput');
const btnAddTask = document.getElementById('addTask');
const btnSaveTask = document.getElementById('saveTask');

btnAddTask.addEventListener('click', addTask);


function addTask(){
    let taskText = taskInput.value;
    // verify if the task text isn't empty
    if(taskText !== ''){
        createTaskElement(taskText);
        taskInput.value = '';
    }
};

function createTaskElement(taskText){
    // get the taskList container
    const taskListContainer = document.getElementById('taskList');
    // create elemtns for the task render
    const taskContainer = document.createElement('div');
    const taskCheckContainer = document.createElement('div');
    const taskTextContainer = document.createElement('div');
    const taskActionsContainer = document.createElement('div');
    const taskTextElement = document.createElement('p');
    // create button actions for the task
    const taskBtnCheckbox = document.createElement('input');
    const taskBtnEdit = document.createElement('button');
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
    taskBtnDelete.className = 'cursor-pointer text-sm text-(--text) hover:text-gray-300 transition-all duration-300 ease-in-out';
    taskBtnDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM428.5-291.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5ZM280-720v520-520Z"/></svg>';
    // set the task text
    taskTextElement.innerText = taskText;
    // append the elements to the each task container
    taskCheckContainer.appendChild(taskBtnCheckbox);
    taskTextContainer.appendChild(taskTextElement);
    taskActionsContainer.appendChild(taskBtnEdit);
    taskActionsContainer.appendChild(taskBtnDelete);
    // append each container to taskContainer
    taskContainer.appendChild(taskCheckContainer);
    taskContainer.appendChild(taskTextContainer);
    taskContainer.appendChild(taskActionsContainer);
    // append everything to the taskListContainer
    taskListContainer.appendChild(taskContainer);

    // events for the action buttons
    // select task checkbox
    taskBtnCheckbox.addEventListener('click', () => {
        console.log('task selected', taskText);
    });
    // button to edit task
    taskBtnEdit.addEventListener('click', () => {
        btnAddTask.classList.toggle('hidden');
        btnSaveTask.classList.toggle('hidden');
        updateTask(btnSaveTask, btnAddTask, taskTextElement, taskBtnEdit, taskBtnDelete, taskBtnCheckbox);
    });

    // button to delete task
    taskBtnDelete.addEventListener('click', () => {
        taskContainer.remove();
    });

    // debugging
    // console.log('task added', taskText);
};

function updateTask(btnSaveTask, btnAddTask, taskTextElement, taskBtnEdit, taskBtnDelete, taskBtnCheckbox){
    // change the edit button text to cancel
    taskBtnEdit.innerText = 'Cancel';

    if (btnAddTask.classList.contains('hidden')){
        // disable the delete and checkbox buttons while editing
        taskBtnDelete.disabled = true;
        taskBtnCheckbox.disabled = true;

        // insert the current task value into the input field
        taskInput.value = taskTextElement.innerText;

        // listener for the save button to update the task
        btnSaveTask.addEventListener('click', () => {
            // update the task text if isn't empty
            if (taskInput.value !== ''){
                // toggle the buttons functionality
                btnAddTask.classList.toggle('hidden');
                btnSaveTask.classList.toggle('hidden');
                console.log('task updated from:', taskTextElement.innerText, 'to:', taskInput.value);
                // update the task text
                taskTextElement.innerText = taskInput.value;
                taskInput.value = '';
                // update buttons state
                taskBtnDelete.disabled = false;
                taskBtnCheckbox.disabled = false;
                taskBtnEdit.innerText = 'Edit';
            };
        });
    };

    // cancel the update task process
    if (btnSaveTask.classList.contains('hidden')){
        taskInput.value = '';
        taskBtnEdit.innerText = 'Edit';
        taskBtnDelete.disabled = false;
        taskBtnCheckbox.disabled = false;
    };
};