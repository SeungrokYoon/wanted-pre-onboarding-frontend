import { PropsWithChildren, createContext, useContext } from 'react'
import useForm, { FormContext, FormModeType } from '../hooks/useform'
import { Link } from 'react-router-dom'

type SignFormContext = FormContext

const SignFormContext = createContext<FormContext | null>(null)

interface SignFormProps extends PropsWithChildren {
  mode: FormModeType
}
export default function SignForm({ children, mode }: SignFormProps) {
  const data = useForm(mode)
  return (
    <SignFormContext.Provider value={{ ...data }}>
      <form onSubmit={(e) => e.preventDefault()}>{children}</form>
    </SignFormContext.Provider>
  )
}

const useSignFormContext = () => {
  const context = useContext(SignFormContext)
  if (context === null) throw new Error('Context is null')
  return context
}

function SignFormInputEmail({ testId }: { testId: string }) {
  const context = useSignFormContext()
  return (
    <label>
      <input
        id="email"
        name="user_email"
        type="email"
        data-testid={testId}
        placeholder="이메일을 입력해주세요"
        value={context.email.email}
        onChange={context.onChangeEmail}
        required
        pattern="@{1}"
      />
      <div className="validation-note">{context.email.errorMessage}</div>
    </label>
  )
}

function SignFormInputPassword({ testId }: { testId: string }) {
  const context = useSignFormContext()
  return (
    <label htmlFor="password" title="password 입력란">
      <input
        id="password"
        name="user_password"
        type="password"
        data-testid={testId}
        placeholder="비밀번호를 입력해주세요"
        value={context.password.password}
        onChange={context.onChangePassword}
        required
      />
      <div className="validation-note">{context.password.errorMessage}</div>
    </label>
  )
}

function SignFormButtonGroup({ testId }: { testId: string }) {
  const context = useSignFormContext()
  return (
    <>
      <button
        type="button"
        data-testid={testId}
        disabled={!context.isSubmittable}
        onClick={context.sendData}
      >
        Sign In
      </button>
      <div>
        <Link to={'/signup'}>go to Sign Up</Link>
      </div>
    </>
  )
}

SignForm.Form = SignForm
SignForm.Email = SignFormInputEmail
SignForm.Password = SignFormInputPassword
SignForm.ButtonGroup = SignFormButtonGroup
