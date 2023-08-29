import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthState } from '../AuthProvider'
import SignForm from '../components/SignForm'
import { AuthBodyType, SigninResponse, signupRequest } from '../api/auth'
import { useState } from 'react'
import { isAxiosError } from 'axios'
import { UNKNOWN_ERROR } from '../utils/instance'

const SignUpPage = () => {
  const { checkUserAuth } = useAuthState()
  const navigate = useNavigate()
  const [error, setError] = useState({
    error: false,
    message: '',
  })

  const requestSignup = (data: AuthBodyType) => {
    signupRequest(data)
      .then(() => {
        alert('회원가입 완료!')
        navigate('/signin')
      })
      .catch((err) => {
        if (isAxiosError<SigninResponse>(error)) {
          setError({
            error: true,
            message: error.message,
          })
          return
        }
        setError({
          error: true,
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
        <section>
          Sign Up Page
          <SignForm.Form>
            <SignForm.Email testId="email-input" />
            <SignForm.Password testId="password-input" />
            <SignForm.ButtonGroup
              testId="signup-button"
              onSubmit={requestSignup}
            />
            <SignForm.Error message={error.message} />
          </SignForm.Form>
        </section>
      )}
    </>
  )
}

export default SignUpPage
