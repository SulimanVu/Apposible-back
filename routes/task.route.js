const Router = require("express");
const router = Router();
const { taskController } = require("../controllers/task.controller");

router.post("", taskController.createTask);
router.get("/all", taskController.getAllTask);
router.get("/room/:id", taskController.getTaskInRoom);
router.patch("/solved/:id", taskController.changeTaskSolved);
router.patch("/update/:id", taskController.changeTask);
router.delete("/delete/:id", taskController.deleteTask);

module.exports = router