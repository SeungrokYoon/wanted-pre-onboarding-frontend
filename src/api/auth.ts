import { api } from '../utils/instance'

const AUTH_API_URL = {
  signup: '/auth/signup',
  signin: '/auth/signin',
} as const

type SignupBody = { email: string; password: string }
type SigninBody = { email: string; password: string }
type AuthBodyType = SignupBody | SigninBody
type SignupResponse = null
type SigninResponse = {
  access_token: string
}

export const signupRequest = async ({ email, password }: AuthBodyType) => {
  return await api.post<SignupResponse, AuthBodyType>(
    AUTH_API_URL.signup,
    {
      email,
      password,
    },
    { validateStatus: (status) => status < 300 }
  )
}

export const signinRequest = async ({ email, password }: AuthBodyType) => {
  return await api.post<SigninResponse, AuthBodyType>(AUTH_API_URL.signin, {
    email,
    password,
  })
}

export type { AuthBodyType, SigninResponse }
