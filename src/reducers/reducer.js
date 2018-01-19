const initialState = {
  pics: [],
  searchedPics: [],
  cloudinaryId: "",
  mongoId: "",
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add Pics":
      return {
        ...state,
        pics: action.pics
      };
    case "Searched Pics":
      return {
        ...state,
        searchedPics: action.pics
      };
    case "Error Message":
      return {
        ...state,
        error: action.message
      };
    case "Cloudinary ID":
      return {
        ...state,
        cloudinaryId: action.id
      };
    case "Mongo ID":
      return {
        ...state,
        mongoId: action.id
      };

    default:
      return state;
  }
};

export default reducer;
