const Router = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");
const { roomController } = require("../controllers/room.controller");

router.get("", authMiddleware, roomController.getRoom);
router.post("/create/:id", authMiddleware, roomController.createRoom);
router.delete("/delete/:id", authMiddleware, roomController.deleteRoom);
router.patch("/addUser/:id", authMiddleware, roomController.addUserRoom);
router.patch("/deleteUser/:id", authMiddleware, roomController.deleteUserRoom);

module.exports = router;
