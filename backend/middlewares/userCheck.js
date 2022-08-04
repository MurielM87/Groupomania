const jwt = require("jsonwebtoken");
const database = require("../models");

exports.users = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN);
	const userId = decodedToken.userId;
	database.user.findByPk(userId)
	.then((user)=>{
		if (user.isAdmin !== true){
			database.user
			.findByPk(req.params.id)
			.then((user) => {
				if (user.userId !== userId) {
					res.status(401).json({
						message: "opération non autorisée",
					});
				} else {
					next();
				}
			});
		} else{
			next()
		}
	})
};


exports.posts = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN);
	const userId = decodedToken.userId;
	database.user.findByPk(userId)
	.then((user)=>{
		if (user.isAdmin !== true){
			database.post
			.findByPk(req.params.id)
			.then((post) => {
				if (post.userId !== userId) {
					res.status(401).json({
						message: "opération non autorisée",
					});
				} else {
					next();
				}
			});
		}else{
			next()
		}
	})
};

exports.comments = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.TOKEN);
	const userId = decodedToken.userId;
	database.user.findByPk(userId)
	.then((user)=>{
		if (user.isAdmin !== true){
			database.comment
			.findByPk(req.params.id)
			.then((comment) => {
				if (comment.userId !== userId) {
					res.status(401).json({
						message: "opération non autorisée",
					});
				} else {
					next();
				}
			});
		} else {
			next();
		}
	})
};