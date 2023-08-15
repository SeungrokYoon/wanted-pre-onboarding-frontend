import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthState = {
  userState: { auth: boolean }
  signinUser: (token: string) => void
  signoutUser: () => void
  checkUserAuth: () => boolean
}

const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userState, setUserState] = useState({ auth: false })

  const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token')
    return accessToken ? accessToken : null
  }

  const signinUser = (token: string) => {
    localStorage.setItem('access_token', token)
    setUserState(() => ({ auth: true }))
  }

  const signoutUser = () => {
    localStorage.removeItem('access_token')
    setUserState(() => ({ auth: false }))
  }

  const checkUserAuth = () => {
    const accessToken = getAccessToken()
    return accessToken !== null && accessToken.length > 0 && userState.auth
  }

  useEffect(() => {
    getAccessToken() ? setUserState(() => ({ auth: true })) : ''
  }, [])

  return (
    <AuthContext.Provider
      value={{ userState, signinUser, signoutUser, checkUserAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthState = () => {
  const state = useContext(AuthContext)
  if (!state) throw new Error('Cannot find AuthContext')
  return state
}
