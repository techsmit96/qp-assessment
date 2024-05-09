class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith(`4`) ? 'fail' : 'error';
      this.isOperational = true;
  
      // Ensure that 'this' is properly captured in the stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  