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
  name: string;
  alias: string;
  addresses: IAddress[];
  accountDetails: IAccountDetails[];
  website: string;
}
