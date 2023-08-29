import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import SignForm from '../components/SignForm'
import ErrorBoundary from '../components/ErrorBoundary'
import { AuthBodyType, SigninResponse, signinRequest } from '../api/auth'
import { isAxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/instance'

const SignInPage = () => {
  const { checkUserAuth, signinUser } = useAuthState()
  const [error, setError] = useState({
    message: '',
  })

  const requestSignin = (data: AuthBodyType) => {
    signinRequest(data)
      .then((res) => {
        signinUser(res.data.access_token)
      })
      .catch((err) => {
        if (isAxiosError<SigninResponse>(error)) {
          setError({
            message: error.message,
          })
          return
        }
        setError({
          message: UNKNOWN_ERROR.message,
        })
        console.error(err)
      })
  }

  return (
    <>
      {checkUserAuth() ? (
        <Navigate to="/todo" replace />
      ) : (
        <ErrorBoundary>
          <section>
            Sign In Page
            <SignForm.Form>
              <SignForm.Email testId="email-input" />
              <SignForm.Password testId="password-input" />
              <SignForm.ButtonGroup
                testId="signin-button"
                onSubmit={requestSignin}
              />
              <SignForm.Error message={error.message} />
            </SignForm.Form>
          </section>
        </ErrorBoundary>
      )}
    </>
  )
}

export default SignInPage
