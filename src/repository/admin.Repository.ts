import { Admin } from "../models/admin.model";
import { IAdmin } from "../interfaces/admin.interface";

export const findAdminByUsername = async (
  username: string
)=> {
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  } catch (error:any) {
    error.message
    
  }
};



export const createAdmin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
})=> {
  try {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    return newAdmin;
  } catch (error:any) {
   error.message
  }
};
