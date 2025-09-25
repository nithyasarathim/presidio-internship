const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [${req.originalUrl}] Error: ${message}`);
    res.status(statusCode).json({
      success: false,
      status: statusCode,
      error: message,
    });
  };
export default errorHandler;
  