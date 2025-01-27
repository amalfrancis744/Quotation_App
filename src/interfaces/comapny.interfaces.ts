interface IAddress {
  address: string;
  city: string;
  pincode: string;
  district: string;
  state: string;
}
interface IAccountDetails {
  name: string;
  accType: string;
  mobileNo: string;
  email: string;
  isActive: boolean;
}
export interface ICompany extends Document {
  companyName: string;
  alias: string;
  mobileNo:number;
  state:string;
  email:string;
  addresses: IAddress[];
  accountDetails: IAccountDetails[];
  website: string;
  isDeleted: boolean;
  deletedAt?: Date;
}
