import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import { TodoType } from '../pages/api'

interface TodoListProps extends PropsWithChildren {
  data: TodoType[]
}

const TodoList = ({ children, data }: TodoListProps) => {
  return <TodoListWrapper>{children}</TodoListWrapper>
}

export default TodoList

const TodoListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  height: 90%;
  list-style: none;
  overflow-y: auto;
`
