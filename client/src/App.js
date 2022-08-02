import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profil from './components/Profil';

function App() {
  const {isLoading, isAuthenticated} = useAuth0()

  if(isLoading) return <div>Loading...</div>

  return (
    <>
      {!isAuthenticated ? 
        <LoginButton /> 
      :
        <LogoutButton />
      }
      {/* <Profil /> */}
    </>
  );
}

export default App;
