
export interface IUser {

    id: string;
    email: string;
    password: string;
    companyId?:string
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
 }