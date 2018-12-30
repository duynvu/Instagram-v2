const Comment = require('../models/Comment');

class CommentService {
	static create(comment) {
		return Comment.create(comment);
	}

	static findById(id) {
		return Comment.findById(id);
	}
}