module.exports = (err, req, res, next) => {
  const { error, status, message, register_token, name } = err;
  // console.log({err})
  if (error) {
    console.log({ message: 'ERROR AT TRY CATCH', error });
    res.status(status).json({ message, info: error.name });
  }
  if (status) {
    if (register_token) {
      res.status(status).json({ message, register_token })
    } else {
      res.status(status).json({ message });
    }
  } else {
    if (name === 'SequelizeValidationError' || name === 'SequelizeDatabaseError' || name === 'SequelizeConnectionError') {
      res.status(400).json({ message });
    } else {
      console.log({ err });
      res.status(500).json({ message: 'internal server error' });
    }
  }
}