import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import { signinRequest, signupRequest } from '../api/auth'

export type FormModeType = 'signin' | 'signup'
export type UseForm = null

interface ErrorState {
  error: boolean
  errorMessage: string
}
interface EmailState extends ErrorState {
  email: string
}
interface PasswordState extends ErrorState {
  password: string
}

export interface FormContext {
  email: EmailState
  password: PasswordState
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void
  sendData: () => void
  isSubmittable: boolean
}

const useForm = (mode: FormModeType) => {
  const navigate = useNavigate()
  const { signinUser } = useAuthState()

  const [email, setEmail] = useState<EmailState>({
    email: '',
    error: false,
    errorMessage: '',
  })
  const [password, setPassword] = useState<PasswordState>({
    password: '',
    error: false,
    errorMessage: '',
  })

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp('[@]')
    const validated = regExp.test(e.target.value)
    validated
      ? setEmail((prev) => ({
          ...prev,
          email: e.target.value,
          error: false,
          errorMessage: '',
        }))
      : setEmail((prev) => ({
          ...prev,
          email: e.target.value,
          error: true,
          errorMessage: 'Email should have at least 1 @',
        }))
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp('.{8,}')
    const validated = regExp.test(e.target.value)
    validated
      ? setPassword((prev) => ({
          ...prev,
          error: false,
          errorMessage: '',
          password: e.target.value,
        }))
      : setPassword((prev) => ({
          ...prev,
          password: e.target.value,
          error: true,
          errorMessage: 'Password should have at least 8 characters',
        }))
  }

  const sendData = () => {
    const data = {
      email: email.email,
      password: password.password,
    }
    if (mode === 'signup') {
      signupRequest(data)
        .then(() => {
          alert('회원가입 완료!')
          navigate('/signin')
        })
        .catch((err) => {
          const message = err.response.data.message
          alert(message)
          console.error(err)
        })
    } else {
      signinRequest(data)
        .then((res) => {
          signinUser(res.data.access_token)
        })
        .catch((err) => {
          const message = err.response.data.message
          alert(message)
          console.error(err)
        })
    }
  }

  return {
    email,
    password,
    onChangeEmail,
    onChangePassword,
    sendData,
    isSubmittable: !(email.error || password.error),
  } as const
}

export default useForm
