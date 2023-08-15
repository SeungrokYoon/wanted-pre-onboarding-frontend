import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'
import Todo from '../components/Todo'

const TodoPage = () => {
  const { userState } = useAuthState()
  const dummyTodos = new Array(30).fill(0).map((v, i) => ({
    id: i + 1,
    todo: `Test todo ${i + 1}`,
    isCompleted: v % 2 ? true : false,
  }))

  return (
    <>
      {!userState.auth ? (
        <Navigate to="/signin" />
      ) : (
        <Section>
          <Title>TodoPage</Title>
          <TodoList>
            {dummyTodos.map(({ id, todo, isCompleted }) => (
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
