import express from 'express';
const routes =express.Router()
import { authorizeRoles,isAuthenticatedUser } from '../Middlewares/Auth.js';
import productApi from '../controller/allProductController.js'


routes.get('/get-All-Products',productApi.getAllProducts)
routes.put('/review',isAuthenticatedUser,productApi.review)
routes.get('/view-product-details/:id',productApi.getProductById)
routes.get('/Reviews',isAuthenticatedUser,productApi.getAllProductReviews)


//Admin routes
routes.post('/create-product',isAuthenticatedUser ,authorizeRoles("admin") ,productApi.createProduct)


export default routes