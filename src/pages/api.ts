const BASE_API_URL = 'https://www.pre-onboarding-selection-task.shop'

type SignupBody = { email: string; password: string }
type SigninBody = { email: string; password: string }

type AuthBodyType = SignupBody | SigninBody

type PostDataType = AuthBodyType
type PostDataReturnType = { status: number; body: string; error: boolean }

const API_URL = {
  signup: '/auth/signup',
  signin: '/auth/signin',
}

const postSignupData = async (url: string, data: PostDataType) => {
  const parsedUrl = BASE_API_URL + url
  const response = await fetch(parsedUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}

const postData = async (url: string, data: PostDataType) => {
  const parsedUrl = BASE_API_URL + url
  const response = await fetch(parsedUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

const postSignup = async (data: AuthBodyType): Promise<PostDataReturnType> => {
  try {
    const response = await postSignupData(API_URL.signup, data)
    if (response.ok) {
      return { status: 201, body: 'Created', error: false }
    } else {
      const parsedBody = await response.json()
      return {
        status: parsedBody.statusCode,
        body: parsedBody.message,
        error: true,
      }
    }
  } catch (e) {
    return { status: 401, body: `${e}`, error: true }
  }
}

const postSignin = async (data: AuthBodyType): Promise<PostDataReturnType> => {
  try {
    const parsedRes = await postData(API_URL.signin, data)
    if (parsedRes.access_token) {
      return { status: 200, error: false, body: parsedRes.access_token }
    } else {
      const { statusCode, message } = parsedRes
      return { status: statusCode, error: true, body: message }
    }
  } catch (e) {
    return { status: 400, body: `${e}`, error: true }
  }
}

export { API_URL, postSignup, postSignin }
