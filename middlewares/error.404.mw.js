import handleError from "../utils/handleError.js";

const errorMiddleware404 = (err, req, res, next) => {
  handleError(res, 404, err.message);
};

export default errorMiddleware404;
