import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'

const PageLayout = ({ children }: PropsWithChildren) => {
  return <Main>{children}</Main>
}

export default PageLayout

const Main = styled.main`
  min-height: calc(100% - 5rem - 50px);
  padding-top: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`
