import morgan from "morgan";
import fs from "fs";
import path from "path";
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

export default morgan(function (tokens, req, res) {
  const log = [
    tokens.date(req, res, "iso"),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens["response-time"](req, res),
    "ms",
    "-",
    tokens.res(req, res, "content-length"),
    "bytes",
  ].join(" ");
  console.log("Log :", log);

  if (tokens.status(req, res) > 399) {
    const loggersDir = path.resolve(process.cwd(), "loggers", "morgan", "log");

    fs.mkdir(loggersDir, { recursive: true }, (err) => {
      if (err) {
        console.error("Error creating directory:", err);
        throw err;
      }

      const baseFilename = tokens.date(req, res, "iso").replace(/[:.]/g, "-");
      let filename = path.join(loggersDir, `${baseFilename}.log`);
      let counter = 1;
      while (fs.existsSync(filename)) {
        filename = path.join(loggersDir, `${baseFilename}_${counter}.log`);
        counter++;
      }

      fs.writeFile(filename, log, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          throw err;
        }
      });
    });
  }
});
