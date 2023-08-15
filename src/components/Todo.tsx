import styled from '@emotion/styled'
import { useState } from 'react'

interface TodoProps {
  text: string
  completed: boolean
}

const Todo = ({ text, completed }: TodoProps) => {
  const [isCompleted, setIsCompleted] = useState(completed)
  return (
    <Li>
      <label>
        <input
          type="checkbox"
          checked={isCompleted}
          onClick={() => {
            setIsCompleted((prev) => !prev)
          }}
        />
        <span>{text}</span>
      </label>
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
