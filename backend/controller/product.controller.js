import { productModel } from "../model/product.model.js";
import { UserModel } from "../model/user.model.js";

export const createProductController = async(req, res)=>{
    try {
        let { productName, description, currency, amount, category, sizes, images, color} = req.body;
        if(!productName || !description || !currency || !amount || !category || !sizes || !images || !color){
            return res.status(401).json({
                message:"All fields are required"
            });
        };

        let newProduct = await productModel.create({
            productName,
            description,
            price:{
                currency,
                amount,
            },
            category,
            sizes,
            images,
            color,
            user_id: req.user_id
        });
        if(!newProduct){
            return res.status(400).json({
                message:"Something went wrong"
            })
        };
        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: { products : newProduct._id}
        });

        return res.status(201).json({
            message:"Product created",
            product : newProduct,
        });
         
    } catch (error) {
        console.log("Error in create the product", error);
        return res.status(500).json({
            message:"Internal server error"
        });
    }
};

export const getAllProducts = async(req, res)=>{
    try {
        let allProducts = await productModel.find().populate("user_id");
        return res.status(200).json({
            message:"All products are fetched",
            products: allProducts,
        });
        
    } catch (error) {
        console.log("Error in getting the products")
        return res.status(500).json({
            message:"Internal server error",
            error
        })
        
    }
}
export const getSingleProduct = async(req, res)=>{
    try {
        let product_id = req.params.product_id;
        if(!product_id){
            return res.status(404).json({
                message:"ID not found!"
            })
        }

        let product = await productModel.findById(product_id);
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        return res.status(200).json({
            message:"Product fetched",
            product
        });

        
    } catch (error) {
        console.log("Error in the single product", error)
        return res.status(500).json({
            message:"Internal server error"
        });
        
    }
};


export const updateProductController = async (req, res)=>{
    try {
        let product_id = req.params.product_id;
        if(!product_id){
            return res.status(404).json({
                message:"Product Id not found"
            })
        }

       let { productName, description, currency, amount, category, sizes, images, color} = req.body;

       if(!productName || !description || !currency || !amount || !category || !sizes || !images || !color){
          return res.status(401).json({
            message:"All fields are required"
          })
       }
       
       let updateProdct = await productModel.findByIdAndUpdate(product_id,
        {
            productName,
            description,
            price:{
                currency,
                amount,
            },
            category,
            sizes,
            colors,
            images,
        },
        {
            new: true,
        }
       )

       if(!updateProdct){
        return res.status(400).json({
            message:"Something went wrong"
        })
       };

       return res.status(200).json({
          message:"Product updated successfully!",
          product:updateProdct
       });

    } catch (error) {
        console.log("Error in the updation of the product")
        return res.status(500).json({
            message:"Internal server error",
            error
        })
        
    }
};


export const deleteProductController = async(req, res)=>{
    try {
        let product_id = req.params.product_id;
        if(!product_id){
            return res.status(404).json({
                message:"Product not found!"
            })
        };

        let deletePro = await productModel.findByIdAndDelete(product_id);
        if(!deletePro){
            return res.status.json(400).json({
                message:"Something went wrong"
            })
        };

        return res.status(200).json({
            message:"Product deleted successfully!"
        })
        
    } catch (error) {
        console.log("Error in deleting the product")
        return res.status(500).json({
            message:"Internal server error",
            error
        })
        
    }
}