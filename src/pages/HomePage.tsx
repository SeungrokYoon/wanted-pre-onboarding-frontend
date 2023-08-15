import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <section>
      {"Welcome to Seungrok's Todo!"}
      <div>
        <button type="button">
          <Link to="/todo">TodoList 구경하러 가기</Link>
        </button>
      </div>
    </section>
  )
}

export default HomePage
