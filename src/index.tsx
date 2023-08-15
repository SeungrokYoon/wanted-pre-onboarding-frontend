import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import TodoPage from './pages/TodoPage'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  { path: '/signin', element: <SignInPage /> },
  { path: '/todo', element: <TodoPage /> },
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
