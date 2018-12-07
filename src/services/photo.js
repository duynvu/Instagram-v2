const Photo = require('../models/Photo');

export function findPhotoById(id) {
  return Photo.findById(id);
}

export async function createPhoto(newPhoto) {
  try {
    await Photo.create(newPhoto);
  } catch(err) {
    console.log(err);
  }
}

export async function removePhoto(_id) {
  try {
    await Photo.remove({_id});
  } catch(err) {
    console.log(err);
  }
}
