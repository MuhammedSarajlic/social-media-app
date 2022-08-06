import { useAuth0 } from '@auth0/auth0-react'
import './App.css'
import LoginButton from './components/LoginPage'
import HomePage from './components/HomePage'

function App() {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) return <div>Loading...</div>

  return <>{!isAuthenticated ? <LoginButton /> : <HomePage />}</>
}

export default App
