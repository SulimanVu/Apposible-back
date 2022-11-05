const Router = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");
const {fileController} = require("../controllers/file.controller");

router.post("", authMiddleware, fileController.createDir);
router.get("", authMiddleware, fileController.fetFiles);

module.exports = router;
