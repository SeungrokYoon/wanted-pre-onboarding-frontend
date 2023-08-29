import { PropsWithChildren, useEffect, useState } from 'react'

function ErrorBoundary({ children }: PropsWithChildren) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorInfo, setErrorInfo] = useState<string | null>(null)

  useEffect(() => {
    const componentDidCatch = (error: ErrorEvent) => {
      setHasError(true)
      setError(error.message)
      setErrorInfo(errorInfo)
    }

    window.addEventListener('error', (error) => {
      if (error === null) return
      componentDidCatch(error)
    })

    return () => {
      window.removeEventListener('error', componentDidCatch)
    }
  }, [])

  if (error) return <>error</>
  return (
    <>
      {children}
      {hasError && <div>modal</div>}
    </>
  )
}

export default ErrorBoundary
