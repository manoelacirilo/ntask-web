const Template = require('../templates/user.js');
const RequestHelper = require('../util/requestHelper.js');

class User extends RequestHelper {
  constructor(body) {
    super();
    this.body = body;
  }

  render() {
    this.renderUserData();
  }

  addEventListener() {
    this.userCancelClick();
  }

  renderUserData() {
    this.get('/user')
      .then(res => {
        this.body.innerHTML = Template.render(res.data);
        this.addEventListener();
      })
      .catch(err => this.emit('error', err));
  }

  userCancelClick() {
    const btn = this.body.querySelector('[data-remove-account]');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Want to delete your account?')) {
        this.delete('/user')
          .then(() => this.emit('remove-account'))
          .catch(err => this.emit('remove-error', err));
      }
    });
  }
}
module.exports = User;
