import { combineReducers } from 'redux'
import UserReducer from './users/reducer'
import TodoReducer from './todos/reducer'

const rootReducer = combineReducers({
    users: UserReducer,
    todos: TodoReducer
})

export default rootReducer;