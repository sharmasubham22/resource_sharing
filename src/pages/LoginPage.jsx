import {React, useState} from 'react'
import { useFirebase } from '../context/Firebase';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firebase = useFirebase();
   console.log(firebase);
  return (
    <div className='login-page'>
        <label>Email address</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder='Enter email address'/>
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder='Enter password'/>
      <button onClick={() => firebase.login(email, password)}>Login</button>
    </div>
  )
}
