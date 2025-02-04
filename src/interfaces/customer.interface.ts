import mongoose from "mongoose";

export interface Icustomer{
    name:string;
    email:string;
    mobileNo:string;
    company: string | mongoose.Types.ObjectId;
    isDeleted:boolean;
    deletedAt:Date;
    deletedBy?: string; // Reference to User who deleted


}