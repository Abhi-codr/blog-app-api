const handleError = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "Something Went Wrong";
  }
  // console.log(err);
  res.status(statusCode).json({ status: "failure", message: err.message });
};

module.exports = handleError;
