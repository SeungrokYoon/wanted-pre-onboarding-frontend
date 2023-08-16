import styled from '@emotion/styled'
import { useState } from 'react'

interface TodoProps {
  id: number
  text: string
  completed: boolean
  isEditable: boolean
  handleUpdate: (todoId: number, todo: string, isCompleted: boolean) => void
  handleDelete: (todoId: number) => void
  handleEditable: (todoId: number | null) => void
}

const Todo = ({
  id,
  text,
  completed,
  isEditable,
  handleUpdate,
  handleDelete,
  handleEditable,
}: TodoProps) => {
  const [isCompleted, setIsCompleted] = useState(completed)
  const [editText, setEditText] = useState(text)

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
        {!isEditable ? (
          <span>{text}</span>
        ) : (
          <input
            type="text"
            data-testid="modify-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUpdate(id, editText, isCompleted)
                handleEditable(null)
              } else if (e.key === 'Escape') {
                setEditText(text)
                handleEditable(null)
              }
            }}
          />
        )}
      </label>
      {!isEditable ? (
        <ButtonContainer>
          <button
            type="button"
            data-testid="modify-button"
            onClick={() => {
              handleEditable(id)
            }}
          >
            수정
          </button>
          <button
            type="button"
            data-testid="delete-button"
            onClick={() => handleDelete(id)}
          >
            삭제
          </button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <button
            type="button"
            data-testid="submit-button"
            onClick={() => {
              handleUpdate(id, editText, isCompleted)
              handleEditable(null)
            }}
          >
            제출
          </button>
          <button
            type="button"
            data-testid="cancel-button"
            onClick={() => {
              setEditText(text)
              handleEditable(null)
            }}
          >
            취소
          </button>
        </ButtonContainer>
      )}
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
