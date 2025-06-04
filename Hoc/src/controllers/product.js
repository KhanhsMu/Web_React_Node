import Product from '../models/product.js';
import { productValid } from '../validation/product.js';

export const getAll = async(req,res) =>{
    try {
         //   res.send('Lay danh sach san pham')
    const products = await Product.find();
    if(products.length === 0)
    {
       return res.status(404).json({
           message: " Khong tim thay san pham"
       });
    }
    return res.status(200).json({
       massage : "Lay danh sach san pham thanh cong",
       data: products,
    });
        
    } catch (error) {
        res.status(500).json({
            massage: error,
        });
    }
   
   }


   export const getDetail = async(req,res) =>{
    try {
        //   res.send('Lay danh sach san pham')
   const product = await Product.findById(req.params.id);
   if(!product)
   {
      return res.status(404).json({
          message: " Khong tim thay san pham"
      });
   }
   return res.status(200).json({
      message : "Lay san pham thanh cong",
      data: product,
   });
       
   } catch (error) {
        console.error(error);
       res.status(500).json({
           message: error.message,
       });
   }
   }

   export const create = async(req,res) =>{
    try {
        const {error} = productValid.validate(req.body);
        if (error) {
            return res.status(400).json(
                {
                    message : error.details[0].message,
                }
            );
        }
        const product = await Product.create(req.body);
        if(!product ){
            return res.status(404).json({
                message:'Tạo sản phẩm không thành công',
            });
        }
        return res.status(200).json({
            message : 'Tao san pham thanh cong',
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
}


export const update = async(req,res) =>{
    try {
        const {error} = productValid.validate(req.body);
        if (error) {
            return res.status(400).json(
                {
                    message : error.details[0].message,
                }
            );
        }
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
        });
        if(!product ){
            return res.status(404).json({
                message:'Cap nhap sản phẩm không thành công',
            });
        }
        return res.status(200).json({
            message : 'Cap nhap san pham thanh cong',
            data: product,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}

export const remove = async(req,res) =>{
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: 'Xoa san pham khong thanh cong',
            });
        }
        return res.status(200).json({
            message: 'Xoa san pham thanh cong',
            data : data,
        });
    } catch (error) {
        return res.status(200).json({
            message: error,
        })
    }
}
