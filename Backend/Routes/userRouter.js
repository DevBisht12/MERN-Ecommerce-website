import express from 'express';
import UserController from '../controller/userController.js';
import { isAuthenticatedUser,authorizeRoles } from '../Middlewares/Auth.js';
const app =express();

app.post('/new',UserController.registerUser)
app.post('/login',UserController.loginUser)
app.get('/logout',UserController.logOutUser)
app.get('/userDetails',isAuthenticatedUser,UserController.getUserDetails)
app.post('/changePassword',isAuthenticatedUser,UserController.changePassword)


//Admin routes
app.get('/admin-getAllUsers', isAuthenticatedUser,authorizeRoles("admin"),UserController.getAllUsers)
app.get('/admin-getUserById/:id', isAuthenticatedUser,authorizeRoles("admin"),UserController.getUserById)
app.post('/admin-updateUserDetails/:id',isAuthenticatedUser,authorizeRoles("admin"),UserController.updateUserDetails)
app.delete('/admin-deleteUser/:id', isAuthenticatedUser,authorizeRoles("admin"),UserController.deleteUser)

export default app;