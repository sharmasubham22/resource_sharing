import { useFirebase } from '../context/Firebase';
import {useState} from 'react';

export default function SignupPage() {
  const firebase = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="max-w-sm mx-auto">
      <div className="signup-page">
         <div className="mb-5">
        <label
          for="name"
          className="block mb-2.5 text-sm font-medium text-heading"
        >
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="name"
          type="text"
          required
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter your name"
        />
        </div>
         <div className="mb-5">
        <label for="email" className="block mb-2.5 text-sm font-medium text-heading">
          Email address
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          id='email'
          required
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter email address"
        />
        </div>
         <div className="mb-5">
        <label for="password" className="block mb-2.5 text-sm font-medium text-heading">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id='password'
          required
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
          placeholder="Enter password"
        />
        </div>
        <button
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={() => firebase.signUp(email, password, name)}
        >
          Sign Up
        </button>
        <br />
        <button
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          onClick={() => firebase.signUpWithGoogle()}
        >
          Sign Up with Google
        </button>
      </div>
    </form>
    
  );
}


