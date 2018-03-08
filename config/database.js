const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
	// uri: 'mongodb://localhost:27017/my-blog', // DEV Env 
	uri: 'mongodb://hasratsabit:Lima1234@ds261838.mlab.com:61838/my-blog',
	secret: crypto,
	db: 'my-blog'
}
