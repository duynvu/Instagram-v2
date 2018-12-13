const Photo = require('../models/Photo');

export function findPhotoById(id) {
  return Photo.findById(id);
}

export async function createPhoto(newPhoto) {
    return Photo.create(newPhoto);
}

export function removePhoto(_id) {
    return Photo.remove({_id});
}

export function getPhotoOfUser(userId) {
    return Photo.find({"author": userId});
}
