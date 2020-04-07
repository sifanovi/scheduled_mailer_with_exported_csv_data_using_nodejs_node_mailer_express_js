'use strict'
module.exports = function (sequelize, DataTypes) {
  var patients = sequelize.define("patients", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    sur_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    phone :{
      type: DataTypes.STRING(15),
      allowNull:true,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    symptoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date_of_symptoms: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });
  patients.associate = function(models)
  {
    patients.hasMany(models.investigations,{
      foreignKey : "patient_id"
    });
  }


  return patients;

}
