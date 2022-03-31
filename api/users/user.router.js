const {
    controllerAddUser,
    controllerGetUsers,
    controllerGetUsersById,
    controllerUpdateUser,
    controllerDeleteUser,
    controllerLogin
} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation")


router.post("/",checkToken, controllerAddUser);
router.get("/",checkToken, controllerGetUsers);
router.get("/:id",checkToken, controllerGetUsersById);
router.patch("/",checkToken, controllerUpdateUser);
router.delete("/",checkToken, controllerDeleteUser);
router.post("/login", controllerLogin);


module.exports = router;