const express = require("express");
const usersRouter = express.Router();
const { authRoles } = require("../middlewares/roles.middleware.js");
const authenticateToken = require("../middlewares/auth.middleware.js");
const { getCurrentUser, getUserByIdTask, getUserById, updateTasker, getTaskerAddresses, addTaskerAddress, deleteTaskerAddress, getCurrentClient, updateClientProfile } = require("../controllers/users.controller.js");
const { upload } = require("../configs/index.js");

usersRouter.get('/user/:id', getUserById);
usersRouter.route('/addresses/:id').get(getTaskerAddresses);

usersRouter.use(authenticateToken);
usersRouter.get('/me', getCurrentUser);
usersRouter.route('/client').get(authRoles(["client"]),getCurrentClient);
usersRouter.get('/:id', getUserByIdTask);
usersRouter.get('/user/:id', getUserById);
usersRouter.route('/updateTasker').put(authRoles(["tasker"]),upload.single("profilePicture"),updateTasker);
usersRouter.route('/updateClient').put(authRoles(["client"]),updateClientProfile);
usersRouter.route('/addresses/:id').get(getTaskerAddresses);
usersRouter.route('/addresses/').post(authRoles(["tasker"]),addTaskerAddress);
usersRouter.route('/addresses/:id').delete(authRoles(["tasker"]),deleteTaskerAddress);




module.exports = usersRouter;
