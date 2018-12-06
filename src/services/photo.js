const Photo = require('../models/Photo');

export function getPhotoById(id) {
  return Photo.findById(id);
}

export async function createPhoto(newPhoto) {
  try {
    await Photo.create(newPhoto);
  } catch(err) {

  }
}
