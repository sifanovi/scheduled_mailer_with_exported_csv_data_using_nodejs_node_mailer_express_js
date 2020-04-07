'use strict'
module.exports = function (sequelize, DataTypes) {
  var symptoms = sequelize.define("symptoms", {
  id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false
      },
     createdAt:{
        type:DataTypes.DATE,
        defaultValue : new Date()
      },
      updatedAt:{
        type:DataTypes.DATE,
        defaultValue : new Date()
      }
  });
  return symptoms;

}
