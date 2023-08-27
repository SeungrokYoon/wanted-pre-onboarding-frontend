import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import SignForm from '../components/SignForm'

const SignInPage = () => {
  const { checkUserAuth } = useAuthState()

  return (
    <>
      {checkUserAuth() ? (
        <Navigate to="/todo" replace />
      ) : (
        <section>
          Sign In Page
          <SignForm.Form mode="signin">
            <SignForm.Email testId="email-input" />
            <SignForm.Password testId="password-input" />
            <SignForm.ButtonGroup testId="signin-button" />
          </SignForm.Form>
        </section>
      )}
    </>
  )
}

export default SignInPage
