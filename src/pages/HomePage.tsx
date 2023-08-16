import styled from '@emotion/styled'
import NavigateButton from '../components/NavigateButton'

const HomePage = () => {
  return (
    <Section>
      <CardContainer>
        <H1>{'안녕하세요, 승록의 TodoList입니다!'}</H1>
        <NavigateButton to="/todo" text={'TodoList 구경하러 가기'} />
      </CardContainer>
    </Section>
  )
}

export default HomePage

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 80%;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.primary_bg_01};
  border-radius: 10px;
`

const H1 = styled.h1`
  color: ${(props) => props.theme.colors.primary_black_01};
`
