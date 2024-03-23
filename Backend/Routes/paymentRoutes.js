import express from 'express';
import { isAuthenticatedUser } from '../Middlewares/Auth.js';
import PaymentController from '../controller/paymentController.js';
const app =express();

app.post('/payment/process',isAuthenticatedUser,PaymentController.processPayment)
app.get('/payment/success',isAuthenticatedUser,PaymentController.checkPaymentStatus)
app.get('/stripeApiKey',isAuthenticatedUser,PaymentController.sendStripeApiKey)


export default app;