import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import PageLayout from './pages/PageLayout'
import styled from '@emotion/styled'

function App() {
  return (
    <Wrapper className="App">
      <NavBar />
      <PageLayout>
        <Outlet />
      </PageLayout>
      <Footer>
        <Span>2023 Wanted Pre-onboarding Mission</Span>
        <Span>by Yoon Seungrok</Span>
      </Footer>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div`
  height: 100%;
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin-top: 50px;
  padding: 10px auto;
`

const Span = styled.span`
  font-size: 1rem;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
`
