import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { TodoType, createTodo, getTodo } from './api'
import Todo from '../components/Todo'

const TodoPage = () => {
  const { userState } = useAuthState()
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState('')
  const [newTodo, setNewTodo] = useState('')

  const getTodoRequest = async () => {
    const res = await getTodo()
    if (res.statusCode === 200) {
      setTodos(() => res.body as TodoType[])
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  const createTodoRequest = async (todo: string) => {
    const res = await createTodo(todo)
    if (res.statusCode === 200) {
      setTodos((prev) => [...prev].concat(res.body as TodoType[]))
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getTodoRequest()
  }, [])

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{isError}</div>
  if (!userState.auth) return <Navigate to="/signin" />
  return (
    <Section>
      <Title>TodoPage</Title>
      <div>
        <input
          data-testid="new-todo-input"
          placeholder="새로운 할 일"
          value={newTodo}
          onChange={(e) => setNewTodo(() => e.target.value)}
        />
        <button
          data-testid="new-todo-add-button"
          onClick={() => createTodoRequest(newTodo)}
        >
          추가
        </button>
        <button type="button"></button>
        <TodoListUl>
          {todos.map(({ id, todo, isCompleted, userId }) => (
            <Todo key={`${userId}-${id}`} text={todo} completed={isCompleted} />
          ))}
        </TodoListUl>
      </div>
    </Section>
  )
}

export default TodoPage

const Title = styled.h1`
  margin-top: 10px;
  margin-bottom: 20px;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`
const TodoListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  height: 90%;
  list-style: none;
  overflow-y: auto;
`
