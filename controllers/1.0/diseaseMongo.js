const { disease_data, sequelize } = require("../../models");
const { Op, where } = require("sequelize");
const { QueryTypes } = require("sequelize");
const e = require("cors");
const { getWhereClause, refactorResponse } = require("../../helpers/disease");
const { MongoClient } = require("mongodb");
// const redis = require("redis");

// const redis_client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
// });

const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
var mongo_client = new MongoClient(uri);
MongoClient.connect(uri, function (err, dbo) {
  if (err) throw err;
  mongo_client = dbo.db(process.env.MONGO_DB);
});

class DiseaseMongo {
  static async list(req, res, next) {
    let dbo = mongo_client;
    let start = Date.now();
    let gejala = [];
    for (let [key, value] of Object.entries(req.body)) {
      if (key.startsWith("gejala_") && value != "") {
        gejala.push(value);
      }
    }
    try {
      dbo
        .collection("icd10_list")
        .find({
          gejala: { $all: gejala },
        })
        .toArray(function (err, response) {
          if (err) throw err;
          response = refactorResponse([], response, gejala);
          res.status(200).send({
            jumlah: response.length,
            data: response,
          });
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
    const id = req.body.id;

    disease_data
      .update(req.body, {
        where: { id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `disease with id ${id} was updated successfully.`,
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
        where: { project_id: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `disease with id ${id} was deleted successfully!`,
          });
        } else {
          res.send({
            message: `Cannot delete disease with id=${id}. Maybe Disease was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete disease with id=" + id,
        });
      });
  }
}

module.exports = DiseaseMongo;
