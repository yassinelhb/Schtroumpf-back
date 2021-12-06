const router = require("express").Router();
const userController = require("../controlles/user.controller");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.put("/follow/:id", userController.follow);
router.put("/unfollow/:id", userController.unfollow);
router.delete("/:id", userController.deleteUser);

module.exports = router;
