'use strict';

module.exports = function (sequelize, DataTypes) {
  var investigations = sequelize.define("investigations", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    symptoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    persistent_cough: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discoloured_phlegm: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pulse_rate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    breaths: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pulse_oximeter: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    oxygen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blood_pressure_systolic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blood_pressure_diastolic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    urine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    food_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carer_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  });
  investigations.associate = function (models) {
    investigations.belongsTo(models.patients, {
      foreignKey: "patient_id"
    });
  }
  return investigations;
}
