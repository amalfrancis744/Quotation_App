export interface IUser {
    id: string;
    email: string;
    password: string;
    company?:string
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    isActive:Boolean
    
}