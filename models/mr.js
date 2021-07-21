"use strict";

module.exports = (sequelize, DataTypes) => {
  const mr = sequelize.define(
    "database_mr",
    {
      icd_10: {
        primaryKey: true,
        type: DataTypes.STRING(10),
        autoIncrement: true,
        allowNull: false,
      },
      name_en: {
        type: DataTypes.STRING(255),
      },
      name_ind: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      hooks: {},
    }
  );
  mr.associate = function (models) {
    mr.hasMany(models.disease_data, {
      foreignKey: "icd_10",
    });
  };
  return mr;
};
