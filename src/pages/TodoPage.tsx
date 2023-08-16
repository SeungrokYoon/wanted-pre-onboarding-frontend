import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import Todo from '../components/Todo'
import useTodoState from '../hooks/useTodoState'

const TodoPage = () => {
  const { userState } = useAuthState()
  const {
    todos,
    isLoading,
    isError,
    newTodo,
    setNewTodo,
    focusedTodoId,
    setFocusedTodoId,
    apiRequests,
  } = useTodoState()

  useEffect(() => {
    userState.auth && apiRequests.getTodoRequest()
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              apiRequests.createTodoRequest(newTodo)
            }
          }}
        />
        <button
          data-testid="new-todo-add-button"
          onClick={() => apiRequests.createTodoRequest(newTodo)}
        >
          추가
        </button>
        <button type="button"></button>
        <TodoListUl>
          {todos.map(({ id, todo, isCompleted, userId }) => (
            <Todo
              key={`${userId}-${id}`}
              id={id}
              text={todo}
              completed={isCompleted}
              isEditable={focusedTodoId === id}
              handleUpdate={apiRequests.updateTodoRequest}
              handleDelete={apiRequests.deleteTodoRequest}
              handleEditable={(id: number | null) => {
                setFocusedTodoId(id)
              }}
            />
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
