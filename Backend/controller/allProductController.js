import { Product } from '../DataBase/models/product.js';
import ApiFeatures from '../utils/apifeatures.js';


class productApi {
    static getAllProducts = async (req, res) => {
        const resultPerPage= 12
        try {
            const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .sort()
            .pagination(resultPerPage)
            const allProducts = await apiFeatures.query;
            res.status(200).json({
                success: true,
                allProducts,
                resultPerPage,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                resultPerPage,
                message: error.message,
            })
        }
    }
    static getProductById = async (req, res) => {
        const {id} = req.params;
        try {
            const product = await Product.findById(id);
            res.status(200).json({
                success: true,
                product,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Product Not Found',
            })
        }
    }
    static createProduct= async (req, res) => {
        try {
            const productData = req.body;
            const newProduct = new Product(productData);
            await newProduct.save();
            res.status(201).json({
                success: true,
                message: 'Product Added Successfully',
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    static review= async (req,res)=>{
        try {
            const {rating,comment,productId} = req.body;
            const review={
                user:req.User._id, 
                name:req.User.name, 
                rating:Number(rating),
                comment,
            }
    
            const product= await Product.findById(productId);
            if(!product){
                return res.status(400).json({
                    success: false,
                    message: "Product not found"
                })
            }
            const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.User._id.toString());
            if(isReviewed){
                product.reviews.forEach((rev)=>{
                    if(rev.user.toString()===req.User._id.toString()){
                        rev.rating=rating;
                        rev.comment=comment;
                    }
                })
            }else{
                product.reviews.push(review);
            }
            product.numberofreviews = product.reviews.length;
            const sumOfRatings = product.reviews.reduce((sum, rev) => sum + rev.rating, 0);
            product.ratings = (sumOfRatings / product.reviews.length).toFixed(1);
            await product.save();
            res.status(200).json({
                success: true,
                product
            })
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: `TEST ${error.message}`
            })
        }
    }
    static getAllProductReviews = async (req, res) => {
        try {
            const {id}=req.query;
            const product= await Product.findById(id);
            if(!product){
                return res.status(400).json({
                    success: false,
                    message: "Product not found"
                })
            }
            res.status(200).json({
                success: true,
                message: 'Product Found',
                reviews: product.reviews
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
    
}

export default productApi;