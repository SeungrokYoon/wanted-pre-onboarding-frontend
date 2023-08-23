import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'
import TodoList from '../components/TodoList'

const TodoPage = () => {
  const { userState } = useAuthState()

  if (!userState.auth) return <Navigate to="/signin" replace />
  return (
    <Section>
      <Title>TodoPage</Title>
      <TodoList>
        <TodoList.Header />
        <TodoList.Body />
      </TodoList>
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
