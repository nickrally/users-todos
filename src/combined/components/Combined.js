import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTodos } from '../../todos'
import { fetchUsers } from '../../users'

const Combined = () => {
    const combinedData = useSelector(state => {
        const users = [...state.users.users]
        const todos = [...state.todos.todos]
        return todosByUsers(users, todos)
    })
    const dispatch = useDispatch();
    const getTodos = () => dispatch(fetchTodos());
    const getUsers = () => dispatch(fetchUsers());
    useEffect(()=>{
        getTodos();
        getUsers();
    },[])  //combinedData passed as dependency causes infinite loop of rendering
    return (
        <div>
            <ul>
                {
                    combinedData.map(user => <li key={user.id}>
                        {user.name}, id: {user.id}
                              <ul>
                                  {
                                    user.todos.map(todo => <li key={todo.id}>
                                        {todo.id}. {todo.title} (userId: {todo.userId})
                                    </li>)
                                  }
                              </ul>
                        </li>)
                    }
                </ul>
        </div>
    )
}

const todosByUsers = (users, todos) => {
    for(const user of users){
        user.todos = []
        for(const todo of todos){
            if(user.id === todo.userId){
                user.todos.push(todo)
            }
        }
    }
    return users
}

export default Combined;
