require('dotenv').config();

module.exports = {
	development: {
		username: process.env.PG_USERNAME,
		password: process.env.PASSWORD,
		database: `${process.env.DATABASE}`,
		host: process.env.PG_HOST,
		port: process.env.PG_PORT || 5432,
		dialect: 'postgres',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		rejectUnauthorized: false,
		dialectOptions: {
			useUTC: process.env.UTC,
			dateStrings: process.env.DATESTRING,
			typeCast: function(field, next) {
				if (field.type === 'DATETIME' || field.type === 'DATE') {
					return field.string();
				}
				return next();
			}
		},
		timezone: `${process.env.TZ}`
	}
};
