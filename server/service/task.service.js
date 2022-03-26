const userModel = require("../model/task");

module.exports.createTask = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .create(data)
      .then((response) => resolve(response))
      .catch((e) => reject(e));
  });
