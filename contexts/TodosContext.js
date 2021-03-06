import {createContext, useState} from 'react'

const TodosContext = createContext();

const TodosProvider = ({children}) => {

    const [todos, setTodos] = useState([]);


    const refreshTodos = async () => {
        try {
            const res = await fetch('/api/getTodos');
            const latestTodos = await res.json();
            setTodos(latestTodos)
        } catch (err) {
            console.error(err)
        }
    }

    const addTodo = async (description) => {
        try {
            const res = await fetch('/api/createTodos', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({description})
            });
            const newTodo = await res.json();
            setTodos((prevTodos) => {
                return [newTodo, ...prevTodos]
            })
        } catch (err) {
            console.error(err)
        }
    }

    const updateTodo = async (updatedTodo) => {
        try {
            const res = await fetch('/api/updateTodos', {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({updatedTodo})
            });
            await res.json();

            setTodos((prevTodos) => {
              const existingTodos = [...prevTodos] ;
              const existingTodo = existingTodos.find(todo => todo.id === updatedTodo.id)
              existingTodo.fields = updatedTodo.fields
              return existingTodos
            })
        } catch (err) {
            console.error(err)
        }
    }


    const deleteTodo = async (id) => {
        try {
            const res = await fetch('/api/deleteTodos', {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({id})
            });
            await res.json();

            setTodos((prevTodos) => {
             
              return prevTodos.filter((todo => todo.id !== id))
            })
        } catch (err) {
            console.error(err)
        }
    }


    return (
        <TodosContext.Provider value={{
            todos,
            setTodos,
            refreshTodos,
            updateTodo,
            deleteTodo,
            addTodo,
        }}> 
            {children}
        </TodosContext.Provider>
    )
}

export {TodosProvider, TodosContext}