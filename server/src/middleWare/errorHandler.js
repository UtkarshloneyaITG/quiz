const errorHandler = (err,req,res,next) => {
  const status = err.status || 500;
  const message = 'backend problem'


  return res.status(status).json({
    message : message,
    statusCode : status,
  })
}
module.exports = errorHandler