import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/Firebase'
import Button from '../../components/Button';


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
    <div class="w-full max-w-sm mx-auto mt-15  bg-background p-6 border border-border rounded-base shadow-xs">
      <form>
        <h1 className="text-2xl md:text-3xl pl-2 my-2 border-l-8 text-text-primary font-heading border-brand mb-10">
          Log in
        </h1>
        <div className="login-page">
          <div className="mb-5">
            <label className="block mb-2.5 text-sm font-medium text-text-primary">
              Email address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
              type="email"
              required
              placeholder="Enter email address"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2.5 text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="block w-full px-3 py-2.5 bg-input-bg border border-input-border text-input-text text-sm focus:input-focus focus:border-brand shadow-xs placeholder:text-input-placeholder rounded-base"
              required
              placeholder="Enter password"
            />
          </div>
          <div>
            <Button
              onClick={submit}
              variant="primary"
              size="sm"
              className="w-full"
            >
              Login
            </Button>
            <Button
              onClick={() => firebase.signUpWithGoogle()}
              variant="secondary"
              size="sm"
              className="w-full my-5"
            >
              Sign in with Google
              <svg
                class="w-5 h-5 ms-1.5 rtl:rotate-180 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div class="text-sm font-medium text-text-secondary">
          Not registered?{" "}
          <a href="/signup" className="text-brand-medium hover:underline">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
}
