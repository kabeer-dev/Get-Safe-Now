"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const db = {};


// Common fields object for created_at and updated_at in models
const commonFields = {
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at', // Specify the desired column name
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at', // Specify the desired column name
  }
};
//

let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,

    {
 
      "host": process.env.DB_HOST,
      "dialect": "mysql",
    },
 
  );

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
      commonFields
    );
   
    // to get response in created_at and updated_at
    model.prototype.toJSON = function () {
      const values = Object.assign({}, this.get());
      values.created_at = values.createdAt;
      delete values.createdAt;
      values.updated_at = values.updatedAt;
      delete values.updatedAt;
      return values;
    //
    };
  
    db[model.name] = model;
    
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    
  }
  
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
