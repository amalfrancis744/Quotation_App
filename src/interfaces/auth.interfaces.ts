// for user authMiddleware purpose
export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// for Admin authMiddleware purpose
export interface adminTokenPayload {
  adminId: string;
}
