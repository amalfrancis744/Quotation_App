import { Admin } from "../models/admin.model";
import { IAdmin } from "../interfaces/admin.interface";

export const findAdminByUsername = async (
  username: string
): Promise<IAdmin> => {
  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      throw new Error("Admin not found");
    }

    return admin;
  } catch (error) {
    throw new Error(
      `Error finding admin: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
export const createAdmin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<IAdmin> => {
  try {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    return newAdmin;
  } catch (error) {
    throw new Error(
      `Error creating admin: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
