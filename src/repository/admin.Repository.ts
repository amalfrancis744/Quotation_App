
import { Admin } from "../models/admin.model"; // Import Admin model and interface


// Find an admin by their username
export const findAdminByUsername = async (username: string) => {
 try {
   const admin = await Admin.findOne({ username });
   if (!admin) {
     throw new Error("Admin not found");
   }
   return admin;
 } catch (error: any) {
   error.message;
 }
};

// Create a new admin document with username and password
export const createAdmin = async ({
 username,
 password,
}: {
 username: string;
 password: string;
}) => {
 try {
   const newAdmin = new Admin({ username, password });
   await newAdmin.save();
   return newAdmin;
 } catch (error: any) {
   error.message;
 }
};

// findAdmin by id 
export const findAdminById = async (id: string) => {
 
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  }
  catch(error)
  {
    
  }
}