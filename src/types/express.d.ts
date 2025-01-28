


declare global {
    namespace Express {
        interface Request {
            user?: any;  // or just 'any' if you didn't create a User type
        }
    }
}

// Need this to make it a module
export {}