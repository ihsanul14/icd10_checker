const _ = require('lodash');
const { Op } = require('sequelize');

class CRUDOptions {
	static getInclude(table) {
		let include = [];

		if (table.length > 0) {
			if (table[0].hasOwnProperty('model')) {
				return table;
			} else {
				for (let i = 0; i < table.length; i++) {
					include.push(table[i]);
				}

				return include;
			}
		} else {
			return include;
		}
	}

	static getSort(order) {
		let sorting = [];

		Object.entries(order).forEach(([ key, value ]) => {
			var attribute = key.substring(5, key.length);
			sorting.push([ attribute, value ]);
		});

		return sorting;
	}

	static setDataSort(data) {
		let order = _.pickBy(data, function(v, k) {
			return _.includes(k, 'sort_');
		});

		return order;
	}

	static setDataFilter(data, table) {
		let where = {};

		let filter = _.omitBy(data, (value, key) => !key.startsWith('filter_'));
		Object.entries(filter).forEach(([ key, value ]) => {
			var label = key.substring(7, key.length);
			if (label.search(table) > -1) {
				var tableLength = table.length + 1;
				var attribute = label.substr(tableLength, label.length);
				where[attribute] = {
					[Op.iLike]: '%' + value + '%'
				};
			}
		});

		return where;
	}
}

module.exports = CRUDOptions;
