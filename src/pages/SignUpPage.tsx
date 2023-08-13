import { ChangeEvent, useState } from 'react'

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
  const isSubmittable = !email.error && !password.error

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
    <div>
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
        >
          submit
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
