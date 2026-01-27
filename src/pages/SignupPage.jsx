import { useFirebase } from '../context/Firebase';
import {React, useState} from 'react';

export default function SignupPage() {
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='signup-page'>
        <label>Email address</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" required placeholder='Enter email address'/>
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" required placeholder='Enter password'/>
      <button onClick={() => firebase.signUp(email, password)}>Sign Up</button>
      <br/>
      <button onClick={() => firebase.signUpWithGoogle()}>Sign Up with Google</button>
    </div>
  );
}


