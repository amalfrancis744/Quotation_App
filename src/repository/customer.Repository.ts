import Customer from "../models/customer.model";
import { Company } from "../models/comapny.model";

export const FindCustomerById = async (id: string) => {
  try {
    const customer = Customer.findById(id).populate({
      path: "company",
      select: `companyName
            alias
            mobileNo
            state
            email
            addresses
            accountDetails
            website
            isDeleted
            deletedAt
            createdAt
            updatedAt`,
      model: "Company",
    });
    if (customer) return customer;
  } catch (error) {
    console.error("Error in findid", error);
    throw error;
  }
};

// Repository function to get customer by ID and company
export const findCustomerByIdandCompany = async (customerId: string, options: { company: string }) => {
    try {
      const { company } = options;
  
      // Find customer by customerId and company
      const customer = await Customer.findOne({ _id: customerId, company, isDeleted: false }).populate({
        path: "company",
        select: `companyName
              alias
              mobileNo
              state
              email
              addresses
              accountDetails
              website
              isDeleted
              deletedAt
              createdAt
              updatedAt`,
        model: "Company",
      });
  
      if (!customer) {
        throw new Error("Customer not found");
      }
  
      return customer;
    } catch (error) {
      console.error("Error in getCustomerById", error);
      throw error; // Re-throw the error for proper handling upstream
    }
  };

export const createCustomer = async (customerDate: any) => {
  try {
    const customer = new Customer(customerDate);
    await customer.save();
    return customer;
  } catch (error) {
    console.error("Error in Create Customer");
    throw error;
  }
};

export const updateCustomerById = async (id: string) => {
  try {
  } catch (error) {
    console.error(" Error in undateCustomerByID");
    throw error;
  }
};

//   check the customer already exist(pass name ,email,mobile)

export const FindCustomerByAll = async (name: any, email: any, company: any, mobileNo: any) => {
    try {
        const [nameExists, emailExists, mobileExists] = await Promise.all([
            name ? Customer.findOne({ name, company }).lean() : Promise.resolve(null),
            email ? Customer.findOne({ email, company }).lean() : Promise.resolve(null),
            mobileNo ? Customer.findOne({ mobileNo, company }).lean() : Promise.resolve(null),
        ]);

        return { nameExists, emailExists, mobileExists };
    } catch (error) {
        console.error("Error in FindCustomerByAll ", error);
        throw error;
    }
};

export const getCustomersByCompany = async (companyId: string) => {
    try {
        const customers = await Customer.find({ company: companyId, isDeleted: false }).populate({
            path: 'company',
            select: `companyName
            alias
            mobileNo
            state
            email
            addresses
            accountDetails
            website
            isDeleted
            deletedAt
            createdAt
            updatedAt`,
            model: 'Company'
          });
        return customers;
    } catch (error) {
        console.error("Error in getCustomersByCompany", error);
        throw error;
    }
};

export const findCustomerById = async (customerId: string) => {
  try {
      const customer = await Customer.findOne({ 
          _id: customerId, 
          isDeleted: false 
      }).populate({
          path: "company",
          select: `companyName
                alias
                mobileNo
                state
                email
                addresses
                accountDetails
                website
                isDeleted
                deletedAt
                createdAt
                updatedAt`,
          model: "Company",
      });

      if (!customer) {
          throw new Error("Customer not found or has been deleted");
      }

      return customer;
  } catch (error) {
      console.error("Error in findCustomerById", error);
      throw error;
  }
};




