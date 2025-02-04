export interface TokenPayload {

    userId: string;
    email: string;
    iat:number;
    exp:number;
    
}

export interface adminTokenPayload {
    adminId: string
}