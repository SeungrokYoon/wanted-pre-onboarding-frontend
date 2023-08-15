import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      HomePage
      <div>
        <button type="button">
          <Link to="/todo">TodoList 구경하러 가기</Link>
        </button>
      </div>
    </div>
  )
}

export default HomePage
