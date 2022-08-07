const Template = require('../templates/tasks.js');
const RequestHelper = require("../util/requestHelper.js");

class Tasks extends RequestHelper {
  constructor(body) {
    super();
    this.body = body;
  }

  render() {
    this.renderTaskList();
  }

  addEventListener() {
    this.taskDoneCheckBox();
    this.taskRemoveClick();
  }

  renderTaskList() {
    this.get('/tasks')
      .then(res => {
        this.body.innerHTML = Template.render(res.data);
        this.addEventListener();
      })
      .catch(err => this.emit('error', err));
  }

  taskDoneCheckBox() {
    const dones = this.body.querySelectorAll('[data-done]');

    for (let i = 0; i < dones.length; i++) {
      dones[i].addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-task-id');
        const done = e.target.getAttribute('dsta-task-done');
        const body = {
          done: !done
        };

        this.put(`/tasks/${id}`, body)
          .then(() => this.emit('update'))
          .catch(err => this.emit('update-error', err));
      });
    }
  }

  taskRemoveClick() {
    const removes = this.body.querySelectorAll('[data-remove]');
    for (let i = 0; i < removes.length; i++) {
      removes[i].addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Want to delete this task?')) {
          const id = e.target.getAttribute('data-task-id');
          this.delete(`/tasks/${id}`)
            .then(() => this.emit('remove'))
            .catch(err => this.emit('remove-error', err));
        }
      });
    }
  }

}

module.exports = Tasks
