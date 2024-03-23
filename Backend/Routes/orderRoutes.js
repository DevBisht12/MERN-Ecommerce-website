import express from 'express';
const app = express();
import orderController from '../controller/orderController.js';
import { isAuthenticatedUser,authorizeRoles } from '../Middlewares/Auth.js';


app.post('/order/new',isAuthenticatedUser,orderController.newOrder)
app.get('/orders/me',isAuthenticatedUser,orderController.getMyOrders)


//Admin Routes
app.get('/admin/getAllOrders',isAuthenticatedUser,authorizeRoles('admin'),orderController.getAllOrders);
app.post('/admin/updateOrderStatus/:id',isAuthenticatedUser,authorizeRoles("admin"),orderController.updateOrderStatus);
app.get('/admin/order/:id',isAuthenticatedUser,authorizeRoles("admin"),orderController.getSingleOrder);


export default app;