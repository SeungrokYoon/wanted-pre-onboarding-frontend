import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface MenuItemType {
  to: string
  text: string
}

const MenuItem = ({ to, text }: MenuItemType) => {
  const navigate = useNavigate()
  return (
    <Li
      onClick={() => {
        navigate(to)
      }}
    >
      {text}
    </Li>
  )
}

export default MenuItem

const Li = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px auto;
  color: ${(props) => props.theme.colors.primary_white};
  font-weight: 500;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.primary_black_01};
  list-style: none;
  cursor: pointer;
`
