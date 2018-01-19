export function addPics(pics) {
  return {
    type: "Add Pics",
    pics
  };
}

export function searchedPics(pics) {
  return {
    type: "Searched Pics",
    pics
  };
}

export function addErrorMessage(message) {
  return {
    type: "Error Message",
    message
  };
}

export function getCloudinaryId(id) {
  return {
    type: "Cloudinary ID",
    id
  };
}

export function getMongoId(id) {
  return {
    type: "Mongo ID",
    id
  };
}
