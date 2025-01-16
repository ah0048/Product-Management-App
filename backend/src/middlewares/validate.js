const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const validationError = new Error('Validation Error');
      validationError.statusCode = 400;
      validationError.details = error.details.map((err) => err.message); // Add specific Joi messages
      return next(validationError);
    }
    next();
  };
  
  module.exports = validate;
  