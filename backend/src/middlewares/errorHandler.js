const errorHandler = (err, req, res, next) => {
    // Default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Log the error (optional, for debugging)
    console.error(`[Error] ${statusCode}: ${message}`);
  
    // Send error response
    res.status(statusCode).json({
      status: 'fail', 
      data: {
        message,
      }
    });
  };
  
  module.exports = errorHandler;
  