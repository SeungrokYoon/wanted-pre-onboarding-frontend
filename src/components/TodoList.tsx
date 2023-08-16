import styled from '@emotion/styled'
import { Dispatch, PropsWithChildren, createContext, useContext } from 'react'
import { TodoType } from '../pages/api'
import useTodoState from '../hooks/useTodoState'
import Todo from './Todo'

type TodoListProps = PropsWithChildren

interface TodoContextType {
  todos: TodoType[]
  isLoading: boolean
  isError: string
  newTodo: string
  setNewTodo: Dispatch<React.SetStateAction<string>>
  focusedTodoId: number | null
  setFocusedTodoId: Dispatch<React.SetStateAction<number | null>>
  apiRequests: {
    getTodoRequest: () => void
    createTodoRequest: (todo: string) => void
    updateTodoRequest: (
      todoId: number,
      todo: string,
      isCompleted: boolean
    ) => void
    deleteTodoRequest: (todoId: number) => void
  }
}

const TodoContext = createContext<TodoContextType | null>(null)

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (context === null) {
    throw new Error('Context value is null type')
  }
  return context
}

const TodoList = ({ children }: TodoListProps) => {
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

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>{isError}</div>
  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        isError,
        newTodo,
        setNewTodo,
        focusedTodoId,
        setFocusedTodoId,
        apiRequests,
      }}
    >
      <TodoListWrapper>{children}</TodoListWrapper>
    </TodoContext.Provider>
  )
}

export default TodoList

const TodoListWrapper = styled.div`
  width: 80%;
`

const TodoHeader = () => {
  const { newTodo, setNewTodo, apiRequests } = useTodoContext()
  return (
    <>
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
    </>
  )
}

const TodoBody = () => {
  const { todos, focusedTodoId, setFocusedTodoId, apiRequests } =
    useTodoContext()
  return (
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
  )
}

const TodoListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  height: 90%;
  list-style: none;
  overflow-y: auto;
`

TodoList.Header = TodoHeader
TodoList.Body = TodoBody
