'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file.indexOf('_') !== 0);
  })
  .forEach(file => {
    db[file.slice(0, file.indexOf('.'))] = require(`./${file}`);
  });

module.exports = db;
