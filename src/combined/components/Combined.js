import { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchTodos } from '../../todos'
import { fetchUsers } from '../../users'

const Combined = props => {
    const { getTodos, getUsers, combinedData } = props
    useEffect(()=>{
        getTodos();
        getUsers();
    },[getTodos, getUsers])
    return (
        <div>
            <h2>Users</h2>
            {
                false
                ? <p>Loading users...</p>
                : <ul>
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
            }
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

const mapStateToProps = state => {
    const users = [...state.users.users]
    const todos = [...state.todos.todos]
    return {
        combinedData: todosByUsers(users, todos)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTodos: () => dispatch(fetchTodos()),
        getUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Combined);
