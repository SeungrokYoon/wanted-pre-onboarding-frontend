const BASE_API_URL = 'https://www.pre-onboarding-selection-task.shop'

type SignupBody = { email: string; password: string }
type SigninBody = { email: string; password: string }

type AuthBodyType = SignupBody | SigninBody

type PostDataType = AuthBodyType
type PostDataReturnType = { status: number; body: string; error: boolean }

const API_URL = {
  signup: '/auth/signup',
  signin: '/auth/signin',
  getTodo: '/todos',
  createTodo: '/todos',
  updateTodo: '/todos',
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

export type GetTodoReturnType = {
  statusCode: number
  body: TodoType[] | string
  error: boolean
}
export type TodoType = {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

const getTodo = async (): Promise<GetTodoReturnType> => {
  try {
    const parsedUrl = BASE_API_URL + API_URL.getTodo
    const accessToken = localStorage.getItem('access_token')
    const response = await fetch(parsedUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (!response.ok) {
      throw new Error('Error occurred while fetching data!')
    }
    const body = await response.json()
    return { statusCode: 200, body, error: false }
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
    console.error(e)
    return { statusCode: 400, body: message, error: true }
  }
}

type PostTodoReturnType = GetTodoReturnType

const createTodo = async (todo: string): Promise<PostTodoReturnType> => {
  try {
    const parsedUrl = BASE_API_URL + API_URL.createTodo
    const accessToken = localStorage.getItem('access_token')
    const response = await fetch(parsedUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ todo }),
    })
    if (!response.ok) {
      throw new Error('Error occurred while posting data!')
    }
    const body = await response.json()
    return { statusCode: 200, body: [body], error: false }
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
    console.error(e)
    return { statusCode: 400, body: message, error: true }
  }
}

const updateTodo = async (
  todoId: number,
  todo: string,
  isCompleted: boolean
): Promise<PostTodoReturnType> => {
  try {
    const parsedUrl = BASE_API_URL + API_URL.updateTodo + `/${todoId}`
    const accessToken = localStorage.getItem('access_token')
    const response = await fetch(parsedUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ todo, isCompleted }),
    })
    if (!response.ok) {
      throw new Error('Error occurred while updating data!')
    }
    const body = await response.json()
    return { statusCode: 200, body: [body], error: false }
  } catch (e) {
    let message = 'Unknown Error'
    if (e instanceof Error) message = e.message
    console.error(e)
    return { statusCode: 400, body: message, error: true }
  }
}

export { API_URL, postSignup, postSignin, getTodo, createTodo, updateTodo }
