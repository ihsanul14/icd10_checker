const vsprintf = require('sprintf-js').vsprintf;
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = {
	generate(table, column, prefix, separator, date) {
		let where = [];
		where[column] = {
			[Op.not]: null
		};

		let json = Object.assign({}, where);
		return new Promise((resolve) => {
			table
				.findOne({
					attribute: [ column ],
					where: json,
					order: [ [ column, 'desc' ] ]
				})
				.then((found) => {
					let numbering;
					if (found !== null) {
						let code = found[column];
						if (code) {
							let formatting = code.split(separator);
							let same = moment(date).isSame(`${formatting[1]}/${formatting[2]}/${formatting[3]}`, 'day');
							let last = formatting[formatting.length - 1];
							let max = parseInt(last) + 1;
							let incrementLength = last.length;

							if (prefix) {
								if (same) {
									numbering = `${prefix}${separator}${date}${separator}${vsprintf(
										`%0${incrementLength}s`,
										max
									)}`;
								} else {
									numbering = `${prefix}${separator}${date}${separator}${vsprintf(
										`%0${incrementLength}s`,
										1
									)}`;
								}
							} else {
								if (same) {
									numbering = `${date}${separator}${vsprintf(`%0${incrementLength}s`, max)}`;
								} else {
									numbering = `${date}${separator}${vsprintf(`%0${incrementLength}s`, max)}`;
								}
							}
						} else {
							if (prefix) {
								numbering = `${prefix}${separator}${date}${separator}${vsprintf(`%06s`, 1)}`;
							} else {
								numbering = `${date}${separator}${vsprintf(`%06s`, 1)}`;
							}
						}
						resolve(numbering);
					} else {
						if (prefix) {
							numbering = `${prefix}${separator}${date}${separator}${vsprintf(`%06s`, 1)}`;
						} else {
							numbering = `${date}${separator}${vsprintf(`%06s`, 1)}`;
						}
						resolve(numbering);
					}
				})
				.catch((error) => {
					console.log(error);
					resolve(null);
				});
		});
	}
};
