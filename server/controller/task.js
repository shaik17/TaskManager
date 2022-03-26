const { StatusCodes } = require("http-status-codes");
const Task = require("../model/task");
const userService = require("../service/task.service");

const createTask = async (req, res, next) => {
  const { taskname, completed } = req.body;
  const obj = {
    userId: req.user.userId,
    taskname: taskname,
    completed: completed,
  };
  if (!taskname) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("Taskname Field is Required");
  }

  try {
    const tasks = await userService.createTask(obj);
    if (!tasks) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Failed To Create" });
    }
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, response: "created successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Something Wrong");
  }
};

const getTask = async (req, res, next) => {
  const { taskname } = req.query;
  const queryObject = {};
  try {
    if (taskname) {
      queryObject.taskname = taskname;
    }
    let tasks = await Task.find(queryObject);

    return res
      .status(200)
      .json({ success: true, data: tasks, totalCount: tasks.length });
  } catch (error) {
    return res.status(500).json(`Something Wrong`);
  }
};
const getIdByTask = async (req, res) => {
  // const {
  //   user: { userId },
  //   params: { id: taskid },
  // } = req;
  const { userId } = req.user;
  try {
    const tasks = await Task.find({ userId: userId });

    if (!tasks) {
      // throw new CustomAPIError(`not found`,404)
      return res.status(StatusCodes.NOT_FOUND).json(`This id${id} Not Found `);
    }

    return res.status(StatusCodes.OK).json({ success: true, response: tasks });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("something Wrong");
  }
};
const getParticularIdTask = async (req, res) => {
  // const {
  //   user: { userId },
  //   params: { id: taskid },
  // } = req;
  const { taskId } = req.params;

  try {
    const tasks = await Task.findOne({ taskId });

    if (!tasks) {
      // throw new CustomAPIError(`not found`,404)
      return res.status(404).json(`This id${id} Not Found `);
    }

    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json("something Wrong");
  }
};

const updateTask = async (req, res) => {
  // const {
  //   user: { userId },
  //   params: { id: taskid },
  // } = req;
  const { taskId } = req.params;
  try {
    const tasks = await Task.findOneAndUpdate({ taskId }, req.body, {
      new: true,
    });
    if (!tasks) {
      return res.status(StatusCodes.BAD_REQUEST).json("Failed to Update");
    }

    return res.status(StatusCodes.OK).json({ success: true, data: tasks });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Something Wrong");
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  // const {
  //   user: { userId },
  //   params: { id: taskid },
  // } = req;
  try {
    const tasks = await Task.findOneAndDelete({ taskId });
    if (!tasks) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("All Ready Deleted Or does not exist");
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "Successfully Deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Something Wrong");
  }
};
module.exports = {
  createTask,
  getTask,
  getIdByTask,
  updateTask,
  deleteTask,
  getParticularIdTask,
};
