const _ = require('lodash');
const moment = require('moment');
const { Op } = require('sequelize');

const stringToBoolean = function(string) {
	switch (string.toLowerCase().trim()) {
		case 'true':
		case 'yes':
		case '1':
			return true;
		case 'false':
		case 'no':
		case '0':
		case null:
			return false;
		default:
			return string;
	}
};

const filter = (req) => {
	let isQuery = req.query;
	let isBody = req.body;
	let data;

	if (isQuery) {
		data = _.omitBy(isQuery, (value, key) => !key.startsWith('filter_'));
	} else {
		data = _.omitBy(isBody, (value, key) => !key.startsWith('filter_'));
	}

	let whereClause = {};

	Object.entries(data).forEach(([ key, value ]) => {
		var attribute = key.substring(7, key.length);
		var isDate = moment(value, 'YYYY-MM-DD', true).isValid();
		if (!isDate) {
			if (stringToBoolean(value) === true || stringToBoolean(value) === false) {
				whereClause[attribute] = value;
			} else {
				whereClause[attribute] = {
					[Op.iLike]: '%' + value + '%'
				};
			}
		} else {
			whereClause[attribute] = value;
		}

		if (value.search('between') > -1) {
			let split = value.split('-');
			whereClause[attribute] = {
				[Op.between]: [ split[1], split[2] ]
			};
		}
	});

	const start = _.omitBy(data, (value, key) => !key.startsWith('filter_start_'));
	const end = _.omitBy(data, (value, key) => !key.startsWith('filter_end_'));

	if (!_.isEmpty(start) && !_.isEmpty(end)) {
		const getKey = Object.keys(start);
		const attrDate = getKey[0].substring(13, getKey[0].length);
		whereClause[attrDate] = {
			[Op.between]: [ Object.values(start)[0], Object.values(end)[0] ]
		};
	} else if (!_.isEmpty(start) && _.isEmpty(end)) {
		const getKey = Object.keys(start);
		const attrDate = getKey[0].substring(13, getKey[0].length);
		whereClause[attrDate] = {
			[Op.gte]: Object.values(start)[0]
		};
	} else if (_.isEmpty(start) && !_.isEmpty(end)) {
		const getKey = Object.keys(end);
		const attrDate = getKey[0].substring(11, getKey[0].length);
		whereClause[attrDate] = {
			[Op.lte]: Object.values(end)[0]
		};
	}

	return whereClause;
};

const pagination = (req) => {
	let isQuery = req.query;
	let isBody = req.body;
	var limited, skip;

	if (isQuery) {
		limited = isQuery.limit !== 'null' ? isQuery.limit : 10;
		skip = isQuery.offset !== 'null' ? 0 + (isQuery.offset - 1) * isQuery.limit : 0;
	} else {
		limited = isBody.limit !== 'null' ? isBody.limit : 10;
		skip = isBody.offset !== 'null' ? 0 + (isBody.offset - 1) * isBody.limit : 0;
	}

	return { limit: limited, page: isNaN(skip) ? 0 : skip };
};

const sort = (req) => {
	let isQuery = req.query;
	let isBody = req.body;
	var data;

	if (isQuery) {
		data = _.omitBy(isQuery, (value, key) => !key.startsWith('sort_'));
	} else {
		data = _.omitBy(isBody, (value, key) => !key.startsWith('sort_'));
	}

	let sorting = [];

	Object.entries(data).forEach(([ key, value ]) => {
		var attribute = key.substring(5, key.length);
		sorting.push([ attribute, value ]);
	});

	return { order: sorting };
};

module.exports = {
	filter,
	pagination,
	sort
};
