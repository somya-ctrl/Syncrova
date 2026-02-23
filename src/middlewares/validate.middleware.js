const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.issues.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

module.exports = validate;