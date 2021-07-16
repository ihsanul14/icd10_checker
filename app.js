/**
 * Include environment into app.js
 */
require('dotenv').config();

/**
 * Include required node module into app.sj
 */
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const xss = require('xss-clean');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
/**
 * HTTP/s server
 */
var server;
if (JSON.parse(process.env.SSL)) {
	var privateKey = fs.readFileSync(`${process.env.SSL_KEY_PATH}`, 'utf8');
	var certificate = fs.readFileSync(`${process.env.SSL_CERT_PATH}`, 'utf8');
	var caBundle = fs.readFileSync(`${process.env.SSL_BUNDLE_PATH}`, 'utf8');
	var credentials = {
		key: privateKey,
		ca: caBundle,
		cert: certificate
	};
	const protocols = require('https');
	server = protocols.createServer(credentials, app);
} else {
	const protocols = require('http');
	server = protocols.createServer(app);
}

/**
 * Call function express js
 */

/**
 * Inisialization port from enviroment
 * if not such in configuration set to default port like 80 or other number
 */
const PORT = process.env.PORT || 80;

/**
 * Include route 
 */
const router = require('./routers');

/**
 * Include middleware
 */
const { errorHandler } = require('./middlewares');

/**
 * Create server 
 */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* make sure this comes before any routes */
app.use(xss());
app.use(helmet());

/**
 * Call main route 
 */
let expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 1);

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SECRET_CONT,
		store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/patient-session' }),
		cookie: { expires: expireDate }
	})
);
app.use('/', router);

/**
 * Set error handle message for sequelize or server error
 */
app.use(errorHandler);

/**
 * Listen server with port
 */
server.listen(PORT, () => {
	console.log(`${process.env.SYSTEM_TITLE} is running on port:${PORT}`);
});

module.exports = app;
