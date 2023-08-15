import { Link } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import styled from '@emotion/styled'

const NavBar = () => {
  const { checkUserAuth, signoutUser } = useAuthState()

  return (
    <Header>
      <nav>
        {!checkUserAuth() && (
          <div>
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )}
        {checkUserAuth() && (
          <button
            type="button"
            onClick={() => {
              const token = localStorage.getItem('access_token')
              token ? localStorage.setItem('access_token', '') : ''
              signoutUser()
              alert('Logged Out')
            }}
          >
            Log out
          </button>
        )}
      </nav>
    </Header>
  )
}

export default NavBar

const Header = styled.header`
  width: 100vw;
  height: 5rem;
  padding: 0.25rem 1rem;
  background-color: 27282D;
`
