const NTask = require("../ntask");

class RequestHelper extends NTask {

  constructor() {
    super();
  }

  get(route) {
    return this.request.get(route, this.getHeaders())
  }

  delete(route) {
    return this.request.delete(route, this.getHeaders())
  }

  put(route, body) {
    return this.request.put(route, body, this.getHeaders())
  }

  post(route, body) {
    return this.request.post(route, body, this.getHeaders())
  }

  getHeaders() {
    return {
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
    }
  }
}

module.exports = RequestHelper;
