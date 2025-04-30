import mongoose, { Schema } from 'mongoose';
import { IProductDocument } from '../../../domain/interfaces/product.interface';


const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        sizes:[{
            stock:Number,
            size:String,
        }],
       
        images: [{
            type: String,
            default: []
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        isDelete: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true,
    }
);


const ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);

export default ProductModel
