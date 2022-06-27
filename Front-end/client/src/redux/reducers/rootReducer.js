import movieSelectReducer from './movieSelectReducer'
import reserveSeatReducer from './reserveSeatReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  movieSelect: movieSelectReducer,
  reserveSeat: reserveSeatReducer
})

export default rootReducer