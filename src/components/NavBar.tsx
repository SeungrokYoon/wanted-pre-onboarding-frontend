import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'
import MenuItem from './MenuItem'

const NavBar = () => {
  const { checkUserAuth, signoutUser } = useAuthState()

  return (
    <Header>
      <nav>
        <Ul>
          <MenuItem to="/" text="홈" />
          {!checkUserAuth() && (
            <>
              <MenuItem to="/signin" text="로그인" />
              <MenuItem to="/signup" text="회원가입" />
            </>
          )}
          {checkUserAuth() && (
            <Li>
              <Button
                type="button"
                onClick={() => {
                  const token = localStorage.getItem('access_token')
                  token ? localStorage.setItem('access_token', '') : ''
                  signoutUser()
                  alert('Logged Out')
                }}
              >
                Log out
              </Button>
            </Li>
          )}
        </Ul>
      </nav>
    </Header>
  )
}

export default NavBar

const Header = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  padding: 0.25rem 1rem;
  background-color: #27282d;
`

const Ul = styled.nav`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
`
const Li = styled.li`
  list-style: none;
`
const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.primary_white};
  font-weight: 500;
  background-color: skyblue;
`
