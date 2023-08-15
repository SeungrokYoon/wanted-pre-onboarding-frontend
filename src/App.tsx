import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <NavBar />
      {"Welcome to Seungrok's Todo!"}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
