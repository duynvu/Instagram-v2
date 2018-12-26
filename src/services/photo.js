const Photo = require('../models/Photo');

class PhotoService {
	static findPhoto(id) {
		return Photo.findById(id);
	}
	
	static findPhotoWithComments(id) {
		return Photo.findById(id).populate('comments');
	}

	static findPhotoWithLikes(id) {
		return Photo.findById(id).populate('likes');
	}

	static findPhotoWithFullInformation(id) {
		return Photo.findById(id).populate('likes', 'comments');
	}
	
	static create(photo) {
		return Photo.create(photo);
	}

	static remove(id) {
		return Photo.remove(id);
	}
}