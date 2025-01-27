
import mongoose, { Schema } from "mongoose";

import { IAdmin } from "../interfaces/admin.interface";

const AdminSchema:Schema = new Schema(

    {
        username:{
            type:String,
            required:true,
        },
        password: {
            type:String,
            required:true,
        },
    },
    {
        timestamps: true,
    }
)

export const Admin = mongoose.model<IAdmin>("Admin",AdminSchema);