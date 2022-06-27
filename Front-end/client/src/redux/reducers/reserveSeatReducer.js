const initialState = { //the initial state
    reservedSeat: []
  }
  
  const reserveSeatReducer = (state = initialState, action) => {
    console.log("reserveSeatReducer")
    if(action.type==="reserveSeatMode")
      return {...state, reservedSeat: action.reservedSeat};
    else
      return {...state};
  }

  export default reserveSeatReducer