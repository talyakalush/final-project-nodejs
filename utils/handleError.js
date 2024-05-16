import Chalk from "chalk";
import path from "node:path";
import * as url from "url";

const handleError = (res, status, message) => {
  res.status(status).send(message);
};

export default handleError;
