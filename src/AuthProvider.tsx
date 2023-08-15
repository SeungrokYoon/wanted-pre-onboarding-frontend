import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthState = {
  userState: { auth: boolean; token: string }
  setUserState: Dispatch<
    React.SetStateAction<{
      auth: boolean
      token: string
    }>
  >
}

export const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userState, setUserState] = useState({ auth: false, token: '' })

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    accessToken
      ? setUserState((prev) => ({ ...prev, auth: true, token: accessToken }))
      : ''
  }, [])

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthState = () => {
  const state = useContext(AuthContext)
  if (!state) throw new Error('Cannot find AuthContext')
  return state
}
