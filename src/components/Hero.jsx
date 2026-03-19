import React from 'react'
import Button from './Button';
import { MoveRight, Upload } from 'lucide-react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (firebase.user) {
      navigate("/add-resource");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-7xl lg:py-16">
      <div className="text-center p-4 md:p-12 mb-8">
        <span className="inline-flex items-center bg-brand-softer border border-brand-soft text-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
          Resources
        </span>
        <h1 className="text-text-primary tracking-tighter text-3xl md:text-6xl font-bold my-6">
          The community's just getting Bigger!!
        </h1>
        <p className="md:text-lg font-normal text-text-secondary mb-6">
          Discover, share, and organize the best learning resources — from code
          to concepts — all in one place.
        </p>
        <div className="block md:inline-flex md:gap-3">
          <Button variant="primary" size="lg" className='inline-flex gap-2'>
            Explore Resources
            <MoveRight />
          </Button>
          <Button variant="secondary" size="lg" className='inline-flex gap-2 mt-2 md:mt-0' onClick={handleUploadClick}>
            Upload your own
            <Upload size={20}/>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-base p-4 md:p-12">
          <span className="inline-flex items-center bg-brand-softer border border-brand-soft text-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
            <svg
              className="w-3 h-3 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 7h.01m3.486 1.513h.01m-6.978 0h.01M6.99 12H7m9 4h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 3.043 12.89 9.1 9.1 0 0 0 8.2 20.1a8.62 8.62 0 0 0 3.769.9 2.013 2.013 0 0 0 2.03-2v-.857A2.036 2.036 0 0 1 16 16Z"
              />
            </svg>
            Collaborate
          </span>
          <h2 className="text-text-primary text-xl md:text-3xl font-semibold my-4">
            Start with Flowbite Design System
          </h2>
          <p className=" font-normal text-text-secondary mb-4">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers.
          </p>
          <a
            href="#"
            className="text-brand hover:underline font-medium text-lg inline-flex items-center gap-2"
          >
            Read more
            <MoveRight />
          </a>
        </div>
        <div className="bg-card rounded-base p-4 md:p-12">
          <span className="inline-flex items-center bg-brand-softer border border-brand-soft text-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
            <svg
              className="w-3 h-3 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
              />
            </svg>
            Code
          </span>
          <h2 className="text-text-primary text-xl md:text-3xl font-semibold my-4">
            Best react libraries around the web
          </h2>
          <p className=" font-normal text-text-secondary mb-4">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers.
          </p>
          <a
            href="#"
            className="text-brand hover:underline font-medium text-lg inline-flex items-center gap-2"
          >
            Read more
            <MoveRight/>
          </a>
        </div>
      </div>
    </div>
  );
}
