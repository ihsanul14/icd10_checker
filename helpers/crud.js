const CRUDOptions = require('./crudOptions');
/**
 * Basic controller to create, read, update, and update data.
 */

class CRUD {
	/**
     * 
     * @param {*} table_name 
     * @param {*} attributes 
     * @param {*} response 
     */
	static create(table_name, attributes, response, cb) {
		table_name
			.create(attributes)
			.then((created) => {
				if (created) {
					if (typeof cb === 'function') {
						cb({
							code: 201,
							title: 'Success',
							message: 'Data saved.',
							type: 'success',
							data: created
						});
					} else {
						response.status(200).json({
							code: 201,
							title: 'Success',
							message: 'Data saved.',
							type: 'success',
							data: created
						});
					}
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 400,
							title: 'Warning',
							message: 'Unable to save.',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 400,
							title: 'Warning',
							message: 'Unable to save.',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'create : Function model.create()',
							error: JSON.stringify(error)
						}
					});
				} else {
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'create : Function model.create()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}

	/**
	 * 
	 * @param {*} table_name 
	 * @param {*} attributes 
	 * @param {*} response 
	 * @param {*} cb 
	 */

	static bulkCreate(table_name, attributes, response, cb) {
		table_name
			.bulkCreate(attributes, { returning: true })
			.then((created) => {
				if (created) {
					if (typeof cb === 'function') {
						cb({
							code: 201,
							title: 'Success',
							message: 'Data saved.',
							type: 'success',
							data: created
						});
					} else {
						response.status(200).json({
							code: 201,
							title: 'Success',
							message: 'Data saved.',
							type: 'success',
							data: created
						});
					}
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 400,
							title: 'Warning',
							message: 'Unable to save.',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 400,
							title: 'Warning',
							message: 'Unable to save.',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'bulkCreate : Function model.bulkCreate()',
							error: JSON.stringify(error)
						}
					});
				} else {
					console.log(error);
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'bulkCreate : Function model.bulkCreate()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}

	/**
     * Function to get list of data from database, this function just show raw data from database, not filtering or cleaning data.
     * If you want to additional response, make your own function in controller or modify this function in helper/crud.js
	 * 
	 * Example for table_name
	 * Represent model name like usersModel/ users
	 * 
	 * Example for attributes :
	 * [ 'id', 'fieldA', 'fieldB' ]
	 * 
	 * Example for where clause :
	 * { 
	 * 		fieldA: valueA, 
	 * 		fieldB : {
	 * 			[Op.x] : valueB1,
	 * 			[Op.x] : valueB2
	 * 		}
	 * }
	 * 
	 * Example for limit :
	 * Limit can use integer value like limit = 10
	 * 
	 * Example for order :
	 * [ ['id','desc'], ['name','asc'] ]
	 * 
	 * Example for associations : 
	 * [ 'model', 'models' ]
	 * model is mostly for belongsTo alias and models for hasMany alias
	 * 
     * @param table_name is represents of model target
     * @param attributes store the data from field of table or model
	 * @param where get data with any condition
	 * @param limit data to show in list
	 * @param order sorting data
	 * @param includes associations model
	 * @param response response from request
	 * @param callback callback
     */
	static readList(table_name, attributes, where, limit, orders, includes, response, cb) {
		let include = CRUDOptions.getInclude(includes);
		let order = CRUDOptions.getSort(orders);

		table_name
			.findAll({ attributes, where, limit, order, include })
			.then((found) => {
				if (found.length > 0) {
					if (typeof cb === 'function') {
						cb({
							code: 200,
							title: 'Success',
							message: 'Data found',
							type: 'success',
							data: found
						});
					} else {
						response.status(200).json({
							code: 200,
							title: 'Success',
							message: 'Data found',
							type: 'success',
							data: found
						});
					}
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 404,
							title: 'Warning',
							message: 'Data not found',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 404,
							title: 'Warning',
							message: 'Data not found',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'readList : Function model.findAll()',
							error: JSON.stringify(error)
						}
					});
				} else {
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'readList : Function model.findAll()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}

	/**
     * Function to get detail of data, this terms of function same with view.
	 * 
	 * Example for table_name
	 * Represent model name like usersModel/ users
	 * 
	 * Example for attributes :
	 * [ 'id', 'fieldA', 'fieldB' ]
	 * 
	 * Example for where clause :
	 * { 
	 * 		fieldA: valueA, 
	 * 		fieldB : {
	 * 			[Op.x] : valueB1,
	 * 			[Op.x] : valueB2
	 * 		}
	 * }
	 * 
	 * Example for associations : 
	 * [ 'model', 'models' ]
	 * model is mostly for belongsTo alias and models for hasMany alias
	 * 
     * @param table_name is represents of model target
     * @param attributes store the data from field of table or model
     * @param where get data with any condition
	 * @param includes associations model
     * @param response response from request
     * @param callback return value with callback
     */
	static readDetail(table_name, attributes, where, includes, response, cb) {
		let include = CRUDOptions.getInclude(includes);
		table_name
			.findOne({
				attributes,
				where,
				include: include
			})
			.then((found) => {
				if (found !== null) {
					if (typeof cb === 'function') {
						cb({
							code: 200,
							title: 'Success',
							message: 'Data found',
							type: 'success',
							data: found
						});
					} else {
						response.status(200).json({
							code: 200,
							title: 'Success',
							message: 'Data found',
							type: 'success',
							data: found
						});
					}
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 404,
							title: 'Warning',
							message: 'Data not found',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 404,
							title: 'Warning',
							message: 'Data not found',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'readDetail : Function model.findOne()',
							error: JSON.stringify(error)
						}
					});
				} else {
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'readDetail : Function model.findOne()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}

	/**
     * Simple and basic to update data, first function check data is existing or not, it exist run function  to update. 
     * @param table_name 
     * @param attributes 
     * @param where 
     * @param response 
     * @param callback 
     */
	static update(table_name, attributes, where, response, cb) {
		table_name
			.findOne({
				where
			})
			.then((found) => {
				if (found !== null) {
					table_name
						.update(attributes, {
							where: {
								id: found.id
							}
						})
						.then((updated) => {
							if (updated[0]) {
								if (typeof cb === 'function') {
									cb({
										code: 200,
										title: 'Success',
										message: 'Data is updated',
										type: 'success',
										data: updated
									});
								} else {
									response.status(200).json({
										code: 200,
										title: 'Success',
										message: 'Data is updated',
										type: 'success',
										data: updated
									});
								}
							} else {
								if (typeof cb === 'function') {
									cb({
										code: 400,
										title: 'Warning',
										message: 'Unable to update',
										type: 'warning',
										data: []
									});
								} else {
									response.status(200).json({
										code: 400,
										title: 'Warning',
										message: 'Unable to update',
										type: 'warning',
										data: []
									});
								}
							}
						})
						.catch((error) => {
							if (typeof cb === 'function') {
								cb({
									code: 400,
									title: 'Failed',
									message: error.message,
									type: 'error',
									trace: {
										address: 'update : Function model.update()',
										error: JSON.stringify(error)
									}
								});
							} else {
								response.status(400).json({
									code: 400,
									title: 'Failed',
									message: error.message,
									type: 'error',
									trace: {
										address: 'update : Function model.update()',
										error: JSON.stringify(error)
									}
								});
							}
						});
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 404,
							title: 'Warning',
							message: 'Data not found',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 404,
							title: 'Warning',
							message: 'Data not found',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'update : Function model.findOne()',
							error: JSON.stringify(error)
						}
					});
				} else {
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'update : Function model.findOne()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}

	/**
     * Function to delete data based on update function, this is update the deleted attribute
     * @param table_name 
     * @param attributes 
     * @param where 
     * @param response 
     * @param callback 
     */
	static delete(table_name, attributes, where, response, cb) {
		table_name
			.update(attributes, { where })
			.then((updated) => {
				if (updated[0]) {
					if (typeof cb === 'function') {
						cb({
							code: 200,
							title: 'Success',
							message: 'Data is deleted',
							type: 'success',
							data: updated
						});
					} else {
						response.status(200).json({
							code: 200,
							title: 'Success',
							message: 'Data is deleted',
							type: 'success',
							data: updated
						});
					}
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 400,
							title: 'Warning',
							message: 'Unable to deleted',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 400,
							title: 'Warning',
							message: 'Unable to deleted',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'delete : Function model.update()',
							error: JSON.stringify(error)
						}
					});
				} else {
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'delete : Function model.update()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}

	/**
     * Function to destroy the data from database
     * @param table_name 
     * @param where 
     * @param response 
     * @param callback 
     */
	static destroy(table_name, where, response, cb) {
		table_name
			.destroy({ where, truncate: true })
			.then((deleted) => {
				if (deleted) {
					if (typeof cb === 'function') {
						cb({
							code: 200,
							title: 'Success',
							message: 'Data is deleted',
							type: 'success',
							data: deleted
						});
					} else {
						response.status(200).json({
							code: 200,
							title: 'Success',
							message: 'Data is deleted',
							type: 'success',
							data: deleted
						});
					}
				} else {
					if (typeof cb === 'function') {
						cb({
							code: 200,
							title: 'Warning',
							message: 'Unable to deleted',
							type: 'warning',
							data: []
						});
					} else {
						response.status(200).json({
							code: 200,
							title: 'Warning',
							message: 'Unable to deleted',
							type: 'warning',
							data: []
						});
					}
				}
			})
			.catch((error) => {
				if (typeof cb === 'function') {
					cb({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'destroy : Function model.destroy()',
							error: JSON.stringify(error)
						}
					});
				} else {
					response.status(400).json({
						code: 400,
						title: 'Failed',
						message: error.message,
						type: 'error',
						trace: {
							address: 'destroy : Function model.destroy()',
							error: JSON.stringify(error)
						}
					});
				}
			});
	}
}

module.exports = CRUD;
