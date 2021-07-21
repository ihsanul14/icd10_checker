"use strict";

module.exports = (sequelize, DataTypes) => {
  const disease = sequelize.define(
    "disease_data",
    {
      icd_10: {
        type: DataTypes.STRING(10),
      },
      group_name: {
        type: DataTypes.STRING(255),
      },
      variant_name: {
        type: DataTypes.STRING(255),
      },
      gejala: {
        type: DataTypes.ARRAY(DataTypes.STRING(255)),
      },
    },
    {
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      hooks: {},
    }
  );
  disease.associate = function (models) {
    disease.belongsTo(models.database_mr, {
      foreignKey: "icd_10",
    });
  };
  return disease;
};
