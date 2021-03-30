import axios from 'axios'
import {
    FETCH_TODO_REQUEST,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILURE
} from './actionTypes'

export const fetchTodoRequest = () => {
    return {
        type: FETCH_TODO_REQUEST
    }
}

export const fetchTodoSuccess = todos => {
    return {
        type: FETCH_TODO_SUCCESS,
        payload: todos
    }
}

export const fetchTodoFailure = error => {
    return {
        type: FETCH_TODO_FAILURE,
        payload: error
    }
}

export const fetchTodos = () => {
    return (detach) => {
        detach(fetchTodoRequest())
        axios.get('https://jsonplaceholder.typicode.com/todos')
          .then(response => detach(fetchTodoSuccess(response.data)))
          .catch(error => detach(fetchTodoFailure(error)))
    }
}