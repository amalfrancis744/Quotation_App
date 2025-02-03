import mongoose from "mongoose";

export interface Icustomer{
    name:string;
    email:string;
    mobileNo:string;
    company: string | mongoose.Types.ObjectId;

}