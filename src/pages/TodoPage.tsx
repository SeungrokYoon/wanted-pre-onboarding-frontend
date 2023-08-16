import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'
import Todo from '../components/Todo'
import { useEffect, useState } from 'react'
import { TodoType, getTodo } from './api'

const TodoPage = () => {
  const { userState } = useAuthState()
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState('')

  const getTodoRequest = async () => {
    const res = await getTodo()
    if (res.statusCode === 200) {
      setTodos(() => res.body as TodoType[])
    } else {
      setIsError(res.body as string)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getTodoRequest()
  }, [])

  return (
    <>
      {!userState.auth ? (
        <Navigate to="/signin" />
      ) : (
        <Section>
          <Title>TodoPage</Title>
          <TodoList>
            {isLoading && <div>Loading</div>}
            {isError && <div>{isError}</div>}
            {!isLoading &&
              !isError &&
              todos.map(({ id, todo, isCompleted }) => (
                <Todo key={id} text={todo} completed={isCompleted} />
              ))}
          </TodoList>
        </Section>
      )}
    </>
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

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  height: 90%;
  list-style: none;
  overflow-y: auto;
`
