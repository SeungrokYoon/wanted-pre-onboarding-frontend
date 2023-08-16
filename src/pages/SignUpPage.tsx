import { ChangeEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { postSignup } from './api'
import { useAuthState } from '../AuthProvider'

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

const SignUpPage = () => {
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
  const { checkUserAuth } = useAuthState()
  const navigate = useNavigate()

  const isSubmittable = !email.error && !password.error

  const postSignupRequest = async () => {
    const res = await postSignup({
      email: email.email,
      password: password.password,
    })
    if (!res.error) {
      alert('회원가입 성공')
      navigate('/todo', { state: '' })
    } else {
      alert(`회원가입에 실패했습니다 다시 시도해주세요 : ${res.body}`)
    }
    return res
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      {checkUserAuth() ? (
        <Navigate to="/todo" />
      ) : (
        <section>
          Sign Up Page
          <form>
            <label htmlFor="email" title="email 입력란">
              <input
                id="email"
                name="user_email"
                type="email"
                data-testid="email-input"
                placeholder="이메일을 입력해주세요"
                value={email.email}
                onChange={handleEmailChange}
                required
                pattern="@{1}"
              />
              <div className="validation-note">{email.errorMessage}</div>
            </label>
            <label htmlFor="password" title="password 입력란">
              <input
                id="password"
                name="user_password"
                type="password"
                data-testid="password-input"
                placeholder="비밀번호를 입력해주세요"
                value={password.password}
                onChange={handlePasswordChange}
                required
              />
              <div className="validation-note">{password.errorMessage}</div>
            </label>
            <button
              type="button"
              data-testid="signup-button"
              disabled={!isSubmittable}
              onClick={postSignupRequest}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  )
}

export default SignUpPage
