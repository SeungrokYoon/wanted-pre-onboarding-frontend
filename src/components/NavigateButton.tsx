import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface NavigateButtonType {
  to: string
  text: string
}

const NavigateButton = ({ to, text }: NavigateButtonType) => {
  const navigate = useNavigate()
  return (
    <Button
      type="button"
      onClick={() => {
        navigate(to)
      }}
    >
      {text}
    </Button>
  )
}

export default NavigateButton

const Button = styled.button`
  width: 100%;
  height: 40px;
  padding: 10px auto;
  color: ${(props) => props.theme.colors.primary_white};
  font-weight: 500;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.primary_black_01};
`
