import { useState } from 'react'

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
  isSubmittable: boolean
}

const useForm = () => {
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

  return {
    email,
    password,
    onChangeEmail,
    onChangePassword,
    isSubmittable: !(email.error || password.error),
  } as const
}

export default useForm
