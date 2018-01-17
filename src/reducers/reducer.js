const initialState = {
  pics: [],
  searchedPics: []
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

    default:
      return state;
  }
};

export default reducer;
