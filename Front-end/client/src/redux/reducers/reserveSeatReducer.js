const initialState = { //the initial state
  movie_id: "",
  showTime: "",  
  reservedSeat: []
  }
  
  const reserveSeatReducer = (state = initialState, action) => {
    console.log("reserveSeatReducer")
    if(action.type==="reserveSeatMode")
      return {...state, movie_id: action.movie_id, showTime: action.showTime, reservedSeat: action.reservedSeat};
    else
      return {...state};
  }

  export default reserveSeatReducer