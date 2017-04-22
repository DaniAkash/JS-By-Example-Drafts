class ToDoClass {

  constructor() {
    this.tasks = [
      {task: 'Go to Dentist', isComplete: false},
      {task: 'Do Gardening', isComplete: true},
      {task: 'Renew Library Account', isComplete: false},
    ];

    this.loadTasks();
    this.addEventListeners();
  }

  addEventListeners() {
    // Delete Task
    document.getElementById('taskList').addEventListener("click", event=> {
      if(event.target.id === 'deleteTask') {
        event.preventDefault();
        this.deleteTask(event.target);
      }
    });

    // Add Task
    document.getElementById('addTask').addEventListener("keypress", event => {
      if(event.keyCode === 13) {
        this.addTask(event.target.value);
        event.target.value = "";
      }
    });
  }

  addTaskClick() {
    let target = document.getElementById('addTask');
    this.addTask(target.value);
    target.value = ""
  }

  addTask(task) {
    let newTask = {
      task,
      isComplete: false,
    };
    if(task === '') {
      document.getElementById('addTask').parentElement.classList.add('has-error');
    } else {
      document.getElementById('addTask').parentElement.classList.remove('has-error');
      this.tasks.push(newTask);
      this.loadTasks();
    }
  }

  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    this.loadTasks();
  }

  deleteTask(target) {
    let taskIndex = target.getAttribute('data-id');
    this.tasks.splice(taskIndex, 1);
    this.loadTasks();
  }

  generateTaskHtml(task, index) {
    return `
      <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="" ${task.isComplete?'checked':''}></label>
          </div>
          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
            ${task.task}
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/"><i id="deleteTask" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
          </div>
        </div>
      </li>
    `;
  }

  loadTasks() {
    let tasksHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
    document.getElementById('taskList').innerHTML = tasksHtml;
  }

}

let toDo;

window.addEventListener("load", () => {
  toDo = new ToDoClass()
});
