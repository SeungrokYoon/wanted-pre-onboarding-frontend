import { useEffect, useState } from 'react'
import {
  TodoType,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from '../utils/api'

const useTodoState = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [focusedTodoId, setFocusedTodoId] = useState<number | null>(null)

  const getTodoRequest = async () => {
    setIsLoading(true)
    const res = await getTodo()
    if (res.statusCode === 200) {
      setTodos(() => res.body as TodoType[])
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  const createTodoRequest = async (todo: string) => {
    setIsLoading(true)
    if (!todo.length) {
      alert('Todo string is empty!')
      setIsLoading(false)
      return
    }
    const res = await createTodo(todo)
    if (res.statusCode === 201) {
      setTodos((prev) => [...prev].concat(res.body as TodoType[]))
      setNewTodo('')
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  const updateTodoRequest = async (
    todoId: number,
    todo: string,
    isCompleted: boolean
  ) => {
    setIsLoading(true)
    const res = await updateTodo(todoId, todo, isCompleted)
    if (res.statusCode === 200) {
      const updatedTodo = res.body[0] as TodoType
      setTodos((prev) =>
        [...prev].map((todo) => {
          if (todo.id === updatedTodo.id) {
            return { ...todo, ...updatedTodo }
          }
          return todo
        })
      )
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  const deleteTodoRequest = async (todoId: number) => {
    const res = await deleteTodo(todoId)
    if (res.statusCode === 204) {
      setTodos((prev) => [...prev].filter((todo) => todo.id !== todoId))
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getTodoRequest()
  }, [])

  return {
    todos,
    isLoading,
    isError,
    newTodo,
    setNewTodo,
    focusedTodoId,
    setFocusedTodoId,
    apiRequests: {
      getTodoRequest,
      createTodoRequest,
      updateTodoRequest,
      deleteTodoRequest,
    },
  }
}

export default useTodoState
