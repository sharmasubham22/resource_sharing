import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useFirebase } from './context/Firebase';

export default function App() {
const firebase = useFirebase();

if(firebase.user === null){
  return (
<div>
  <SignupPage />
  <LoginPage />
</div>
)}
  return (
    <>
      <div>
        <h1>Hello {firebase.user?.email}</h1>
        <button onClick={() => firebase.logout()}>Logout</button>
      </div>
    </>
  )
}


