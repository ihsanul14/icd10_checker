const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		const { action } = req.headers;

		var dir = process.env.UPLOAD_FOLDER + '/' + action;

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		cb(null, dir);
	},
	filename: function(req, file, cb) {
		const ext = path.extname(file.originalname).substr(1);
		cb(null, new Date().getTime() + '.' + ext);
	}
});

const limits = {
	files: 5, // allow only 1 file per request
	fileSize: 1024 * 1024 * 2 // 2 MB (max file size)
};

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'file/pdf'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: storage,
	limits: limits,
	fileFilter: fileFilter
});

module.exports = {
	upload
};
