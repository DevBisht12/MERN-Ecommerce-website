import Stripe from 'stripe';
const STRIPE_SECRET_KEY = 'sk_test_51OsfqASBx2TO3YR2L51U5yNqFon4zFuUctSyjD7JQus4xZ1CCGl6ztOnkgxtwGjJQnjLrre4y5t0LnJWfYsOyLPo00vsRN06ho';
const stripe = new Stripe(STRIPE_SECRET_KEY);


class PaymentController{
    static processPayment=async (req,res,next)=>{
        try {
            const customer = await stripe.customers.create({
                name: req.body.customer.name,
                address: {
                    line1: req.body.customer.address.line1,
                    city: req.body.customer.address.city,
                    state: req.body.customer.address.state,
                    postal_code: req.body.customer.address.postal_code,
                    country: req.body.customer.address.country,
                }
            });
            const currency='inr';
            const session =await stripe.checkout.sessions.create({
                customer: customer.id,
                payment_method_types:['card'],
                mode:'payment',
                line_items:req.body.items.map((item)=>{
                    return{
                        price_data:{
                            currency:currency,
                            product_data:{
                                name:item.name
                            },
                            unit_amount:item.price*100
                        },
                        quantity:item.quantity
                    }
                }), 
                
                success_url:"http://localhost:5000/payment/success",
                cancel_url:"http://localhost:5000/payment/cancel"
            })
            res.status(200).json({
                success: true,
                sessionId:session.id
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static checkPaymentStatus=async (req,res,next)=>{
        try {
            const session = req.cookies.sessionId;
            const payment =await stripe.checkout.sessions.retrieve(session);
            res.status(200).json({
                success: true,
                payment
            })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }    
    static sendStripeApiKey= async(req,res,next)=>{
        res.status(200).json({
            success: true,
            api_key:STRIPE_SECRET_KEY,
        })
    }
}

export default PaymentController;