import { combineReducers } from "redux";
import auth  from './auth/authReducer'
import search  from './searchStuffs/searchReducer'

export default combineReducers({
  auth,
  search
})
