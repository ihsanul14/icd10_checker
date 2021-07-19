const { disease_data, sequelize } = require("../../models");
const { Op, where } = require("sequelize");
const { QueryTypes } = require("sequelize");
const e = require("cors");
const { getWhereClause, refactorResponse } = require("../../helpers/disease");

class Disease {
  static async list(req, res, next) {
    let start = Date.now();
    let gejala = [];
    let response = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key.startsWith("gejala_") && value != "") {
        gejala.push(value);
      }
    }
    const id = req.body.id;
    let where = getWhereClause(gejala);
    let querys = `
      SELECT name_en as variant_name, b.icd_10 as icd_10, b.gejala as gejala 
      FROM database_mr a
      INNER JOIN disease_data b
      ON a.icd_10 = b.icd_10
    `;
    try {
      const records = await sequelize.query(querys + where, {
        type: QueryTypes.SELECT,
      });
      response = refactorResponse(response, records, gejala);
      res.status(200).send({
        jumlah: response.length,
        data: response,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Internal Server Error",
      });
    }
    console.log(`elapsed time : ${Date.now() - start} ms`);
  }

  static listById(req, res, next) {
    const id = req.params.id;

    disease_data
      .findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Disease with id=" + id,
        });
      });
  }

  static listLikeById(req, res, next) {
    const id = req.params.id;

    disease_data
      .findAll({
        where: {
          icd_10: {
            [Op.like]: `%${id}%`,
          },
        },
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Disease with id=" + id,
        });
      });
  }

  static async create(req, res, next) {
    if (!req.body.icd_10) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Disease
    const Disease = {
      group_name: req.body.group_name,
      variant_name: req.body.variant_name,
      icd_10: req.body.icd_10,
      gejala: req.body.gejala,
    };

    // Save Disease in the database
    disease_data
      .create(Disease)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.errors[0].message ||
            "Some error occurred while creating the Disease Data",
        });
      });
  }

  static async update(req, res, next) {
    const id = req.body.icd_10;

    disease_data
      .update(req.body, {
        where: { icd_10: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `Disease with icd_10 ${id} was updated successfully.`,
          });
        } else {
          res.send({
            message: `Cannot update Disease with id=${id}. Maybe Disease was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Disease with id=" + id,
        });
      });
  }

  static async delete(req, res, next) {
    const id = req.params.id;

    disease_data
      .destroy({
        where: { icd_10: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `Disease with icd_10 ${id} was deleted successfully!`,
          });
        } else {
          res.send({
            message: `Cannot delete Project with id=${id}. Maybe Disease was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete disease with icd_10=" + id,
        });
      });
  }
}

module.exports = Disease;
