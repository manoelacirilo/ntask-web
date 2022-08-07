const Signin = require('./components/signin.js')
const Signup = require('./components/signup.js');
const Tasks = require('./components/tasks.js');
const TaskForm = require('./components/taskForm.js');
const User = require('./components/user.js');
const Menu = require('./components/menu.js');

class App {
  constructor(body, footer) {
    this.signin = new Signin(body);
    this.signup = new Signup(body);
    this.tasks = new Tasks(body);
    this.taskForm = new TaskForm(body);
    this.user = new User(body);
    this.menu = new Menu(footer);
  }

  init() {
    this.signin.render();
    this.addEventListener();
  }

  addEventListener() {
    this.signinEvents();
    this.signupEvents();
    this.tasksEvents();
    this.taskFormEvents();
    this.userEvents();
    this.menuEvents();
  }

  signinEvents() {
    this.signin.on('error', () => {
      alert('Error of authentication');
    });
    this.signin.on('open_signup', () => {
      this.signup.render();
    });
    this.signin.on('signin', (token) => {
      localStorage.setItem('token', token)
      this.menu.render('tasks');
      this.tasks.render();
    });
  }

  signupEvents() {
    this.signup.on('error', () => {
      alert('Error of registration')
    });
    this.signup.on('signup', (user) => {
      alert(`${user.name} registered successfully!`);
      this.signin.render();
      this.addEventListener();
    });
  }

  tasksEvents() {
    this.tasks.on('error', () => {
      alert('Error when listing');
    });
    this.tasks.on('remove-error', () => {
      alert('Error deleting');
    });
    this.tasks.on('update-error', () => {
      alert('Error when updating');
    });
    this.tasks.on('remove', () => this.tasks.render());
    this.tasks.on('update', () => this.tasks.render());
  }

  taskFormEvents() {
    this.taskForm.on('error', () => {
      alert('Error when registering');
    });
    this.taskForm.on('submit', () => {
      this.menu.render('tasks');
      this.tasks.render();
    });
  }

  userEvents() {
    this.user.on('error', () => {
      alert('Error loading user');
    });
    this.user.on('remove-error', () => {
      alert('Error deleting account');
    });
    this.user.on('remove-account', () => {
      alert('Your account has been deleted.');
      localStorage.clear();
      this.menu.clear();
      this.signin.render();
    });
  }

  menuEvents() {
    this.menu.on('click', (path) => {
      this.menu.render(path);
      this[path].render();
    });
    this.menu.on('logout', () => {
      localStorage.clear();
      this.menu.clear();
      this.signin.render();
    });
  }
}

module.exports = App;
