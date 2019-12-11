const fs = require("fs");

const writeTo = (file, data) => {
  fs.writeFile(file, JSON.stringify(data, null, 2), err => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = writeTo;
