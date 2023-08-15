import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'

const TodoPage = () => {
  const { userState } = useAuthState()
  return (
    <>{!userState.auth ? <Navigate to="/signin" /> : <div>TodoPage</div>}</>
  )
}

export default TodoPage
