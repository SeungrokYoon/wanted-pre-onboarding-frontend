import { useState } from 'react'

const SignUpPage = () => {
  const [email, setEmail] = useState({
    email: '',
    error: '',
  })
  const [password, setPassword] = useState({ password: '', error: '' })
  const isSubmittable = !email.error && !password.error

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
            onChange={(e) => {
              setEmail((prev) => ({ ...prev, email: e.target.value }))
            }}
            required
            pattern="@{1}"
          />
          <div className="validation-note">{email.error}</div>
        </label>
        <label htmlFor="password" title="password 입력란">
          <input
            id="password"
            name="user_password"
            type="password"
            data-testid="password-input"
            placeholder="비밀번호를 입력해주세요"
            value={password.password}
            onChange={(e) =>
              setPassword((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
          <div className="validation-note">{password.error}</div>
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
