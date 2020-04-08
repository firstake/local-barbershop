const path = require("path");
const createError = require("http-errors");

const SERVICES_FILE = path.join(__dirname, "../database/services/services.json");
const readFrom = require("../utils/readFromFile");

const getServicesInfo = (req, res, next) => {
  let file = SERVICES_FILE;

  if (req.query.page !== undefined) {
    file = path.join(__dirname, `../database/services/${req.query.page}.json`);
  }

  readFrom(file)
    .then(data => res.send(data))
    .catch(err => {
      if (err.code === "ENOENT") {
        return next(createError(404, "Not found!"));
      } else {
        return next(createError(500, "Server error!"));
      }
    });
};

module.exports = getServicesInfo;
