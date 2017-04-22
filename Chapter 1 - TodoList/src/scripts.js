class ToDos {

  constructor() {
    this.tasks = [
      {task: 'Go to Dentist', isComplete: false},
      {task: 'Do Gardening', isComplete: true},
      {task: 'Renew Library Account', isComplete: false},
    ];
    this.loadTasks = this.loadTasks.bind(this);
    this.generateTaskHtml = this.generateTaskHtml.bind(this);

    this.loadTasks();
  }

  generateTaskHtml(task, index) {
    return `
      <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
            <label><input type="checkbox" value="" class="" ${task.isComplete?'checked':''}></label>
          </div>
          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
            ${task.task}
          </div>
          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
            <a class="" href="/"><i class="delete-icon glyphicon glyphicon-trash"></i></a>
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

window.addEventListener("load", new ToDos());
