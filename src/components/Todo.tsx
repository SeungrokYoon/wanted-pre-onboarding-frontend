import styled from '@emotion/styled'
import { useState } from 'react'

interface TodoProps {
  id: number
  text: string
  completed: boolean
  handleUpdate: (todoId: number, todo: string, isCompleted: boolean) => void
}

const Todo = ({ id, text, completed, handleUpdate }: TodoProps) => {
  const [isCompleted, setIsCompleted] = useState(completed)

  return (
    <Li>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => {
            handleUpdate(id, text, !isCompleted)
            setIsCompleted((prev) => !prev)
          }}
        />
        <span>{text}</span>
      </label>
      <ButtonContainer>
        <button type="button" data-testid="modify-button">
          수정
        </button>
        <button type="button" data-testid="delete-button">
          삭제
        </button>
      </ButtonContainer>
    </Li>
  )
}

export default Todo

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  flex: 1;
  height: 2rem;
  padding: 0.25rem 1rem;
  border: 1px solid black;
  border-radius: 5px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 0;
  gap: 10px;
`
