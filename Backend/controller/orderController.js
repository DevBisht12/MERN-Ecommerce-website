import { Order } from "../DataBase/models/order.js";


class orderController {
  static newOrder = async (req, res) => {
    try {
      const { 
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
     } = req.body;
     const order= await Order.create({
         shippingInfo,
         orderItems,
         paymentInfo,
         itemsPrice,
         shippingPrice,
         taxPrice,
         totalPrice,
         paidAt:Date.now(),
         user:req.User._id,
     });
     res.status(201).json({
         success: true,
         message: "Order placed successfully",
         order,
     });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  }
  //get logged in user orders
  static getMyOrders= async (req, res) => {
    try {
        const orders= await Order.find({user:req.User._id})
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  };
  //get single order Admin
  static getSingleOrder= async (req, res) => {
    try {
        const {id}=req.params;
        const order= await Order.findById(id).populate("user","name email");
        if(!order){
            return res.status(400).json({
                success: false,
                message: "Order not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            order,
        });

    } catch (error) {
       res.status(500).json({
        success: false,
        message: error.message 
    })
    }

  };
  //get all orders for Admin
  static getAllOrders= async (req, res) => {
    try {
        const orders= await Order.find();
        let totalAmount=0
        orders.forEach(order=>{
            totalAmount+=order.totalPrice
        })

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            totalAmount:totalAmount,
            orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  };
  //update order status Admin
  static updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(400).json({
                success: false,
                message: "Order not found"
            })
        }
        if(!req.body.status){
            return res.status(400).json({
                success: false,
                message: "Status is required"
            })
        }
        order.orderStatus = req.body.status;
        await order.save();
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  };
}



export default orderController;
