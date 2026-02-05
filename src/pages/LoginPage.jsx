import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firebase = useFirebase();
    const navigate = useNavigate();
    
    console.log(firebase);

    useEffect(() => {
        if (firebase.loggedin) {
            navigate('/');
        }
    },[firebase, navigate]);

    const submit = (e) => {
        e.preventDefault();

        const result = firebase.login(email, password);
        console.log("Success");
    }

  return (
    <form className="max-w-sm mx-auto my-30">
      <h2 className="text-4xl font-bold text-heading mb-5">Login</h2>

      <div className="login-page mb-5">
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Email address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          type="email"
          required
          placeholder="Enter email address"
        />
        <label className="block mb-2.5 text-sm font-medium text-heading">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-fg-brand focus:border-fg-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          required
          placeholder="Enter password"
        />
        <button
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-fg-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={submit}
        >
          Login
        </button>
        <button
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-fg-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={() => firebase.signUpWithGoogle()}
        >
          Sign in with Google
        </button>
      </div>
    </form>
  );
}
