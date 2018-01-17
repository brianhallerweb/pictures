const initialState = {
  pics: [],
  searchedPics: [],
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

    default:
      return state;
  }
};

export default reducer;
