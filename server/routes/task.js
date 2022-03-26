const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const {
  createTask,
  getTask,
  getIdByTask,
  updateTask,
  deleteTask,
  getParticularIdTask,
} = require("../controller/task");

router.route("/taskall").get(auth, getTask);
router.route("/task").post(auth, createTask).get(auth, getIdByTask);
// .patch(auth, updateTask)
// .delete(auth, deleteTask);
router
  .route("/task/:taskId")
  .get(auth, getParticularIdTask)
  .patch(auth, updateTask)
  .delete(auth, deleteTask);

module.exports = router;
