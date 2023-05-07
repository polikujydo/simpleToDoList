// Receiving HTML variables 
const newTaskInput = document.querySelector('#new-task'),
      plusButton = document.querySelector('#add-task'),
      tasks = document.querySelector('#tasks');

const taskArray = []


//Listening plus button
plusButton.addEventListener('click', () => {
  const newTaskInputValue = newTaskInput.value

  if(newTaskInputValue && isUniqueFunc(newTaskInputValue, taskArray) && newTaskInputValue.trim()){

    addTaskFunc(newTaskInputValue, taskArray)
    newTaskInput.value = ""
    tasksRenderFunc(taskArray)

  }
})

//Adding task Function
function addTaskFunc(inputText, array){
  const timeStamp = Date.now(),
        task = { //each task in array identificator 
          id: timeStamp, //Time Id
          isCompleted: false, //checkbox
          inputText, //newTaskInputValue
        }

  array.push(task)
}

//Filtering Unique Tasks Function

//Логіка: унікальність таска стоїть по дефолту(true) і тобто по дефолту всі таксі добавляються 
//А в цій ф-ції ми робимо перевірку на повторюваність і якшо ця функції находить повтор то значення isUnique ставить в false, то есть значеня таке вже є
//По закінченюю ф-ції вона має вернути чи такс вже існує(false)-не унікальний, чи не існує(true)-унікальний
//Значення isUnique іде як індикатор ф-ції - якшо повтор найшовся - вертається false, повтор не найшовся - true
//І якшо true - значення унікальне, воно іде в умову, де виконується ф-ція addTaskFunc, яка пушить такс в масив
//inputText - це те шо в нас в строці ввода і воно передається в об*єкт task, який пушиться в масив

function isUniqueFunc(inputValue, array){ 
  isUnique = true

  array.forEach(eachTask => {
    if(eachTask.inputText == inputValue){
      alert('This task is already added')
      isUnique = false
    }
  });

  return isUnique
}

// ---------------------------------------------------------

//Rendering tasks on the page Function
function tasksRenderFunc(array){
  let listHtml = '';

  array.forEach(eachTask => {
    const clazz = eachTask.isCompleted ? "todo__task todo__task_complete" : "todo__task",
          isChecked = eachTask.isCompleted ? 'checked' : '';


    const taskHtml = `
    <div id="${eachTask.id}" class="${clazz}">
      <label class="todo__checkbox">
          <input type="checkbox" ${isChecked}>
          <div class="todo__checkbox-div"></div>
      </label>
      <div class="todo__task-text">${eachTask.inputText}</div>
      <div class="todo__task-del"><i class="fa-solid fa-trash"></i></div>
    </div>
    `
    listHtml = listHtml + taskHtml
  });

  tasks.innerHTML = listHtml
}

//Cross the task if it is completed Function
function changeTaskStatusFunc(id, array){
  array.forEach(eachTask => {

    if (eachTask.id == id){
      eachTask.isCompleted = !eachTask.isCompleted
    }

  });
}

//Cross the task if it is completed 

//Логіка делегування подій:
//коли кликнули на чекбокс, подія кліка вспливає до родителя (блока tasks), спрацьовує click, запускається ф-ція, в неї попадає event з якого мидостаємо властивість target, в якому збераігається елемент по якому ми клікнули

tasks.addEventListener('click', (event) => {
  const target = event.target, //получаємо елемент по якому ми кликнули
        isCheckboxClicked = target.classList.contains("todo__checkbox-div"),
        isTaskDeleted = target.classList.contains("todo__task-del");


  if (isCheckboxClicked){
    const parentTodoTask =  target.parentElement.parentElement,
          taskId = parentTodoTask.getAttribute('id')

  changeTaskStatusFunc(taskId, taskArray)
  tasksRenderFunc(taskArray)
  }

  if(isTaskDeleted){
     const parentTodoTask = target.parentElement,
           taskId = parentTodoTask.getAttribute('id');

    deleteTaskFunc(taskId, taskArray)
    tasksRenderFunc(taskArray)
 }
})

// Delete task Function
function deleteTaskFunc(id, array){
  array.forEach((eachTask, index) => {
    if(eachTask.id == id){
       array.splice(index, 1)
    }
  });
}
