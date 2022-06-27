const initialState = { //the initial state
    movieName: "",
    description: "",
    genre: "",
    length: "",
    coverURL:"",
    showTime:[],
  }
  
  const movieSelectReducer = (state = initialState, action) => {
    console.log("movieSelectReducer")
    if(action.type==="movieSelectMode")
      return {...state, movieName: action.movieName, description: action.description, genre: action.genre, length: action.length, coverURL: action.coverURL, showTime:action.showTime};
    else
      return {...state};
  }

  export default movieSelectReducer