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
    <div className="p-4 mx-auto max-w-7xl lg:py-8 relative z-10">
      <div className="inline-flex items-center justify-center">
        <div className="text-center lg:text-left p-4 md:p-10">
          <div className="block text-text-primary tracking-tighter font-heading my-6 text-center">
            <p className="text-5xl md:text-7xl lg:text-9xl">Build. </p>
            <p className="font-cursive text-5xl md:text-7xl lg:text-[12rem]/20 text-brand">
              Share.{" "}
            </p>
            <p className="text-5xl md:text-7xl lg:text-9xl">Grow. </p>
          </div>

          <p className="font-body text-xl text-text-secondary mb-6 text-center">
            Discover, share, and organize the best learning resources - from
            code to concepts - all in one place.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4">
            <Button
              variant="primary"
              size="md"
              className="inline-flex gap-2"
              onClick={() => {
                navigate("/resources");
              }}
            >
              Explore Resources
              <MoveRight />
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="inline-flex gap-2 mt-2 md:mt-0"
              onClick={handleUploadClick}
            >
              Upload your own
              <Upload size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-base p-4 md:p-12">
          <h2 className="text-text-primary text-2xl md:text-3xl font-heading  mb-4">
            Start with Flowbite Design System
          </h2>
          <p className=" font-body text-xl text-text-secondary mb-4">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers.
          </p>
          <a
            href="#"
            className="text-brand hover:underline font-body text-lg inline-flex items-center gap-2"
          >
            Read more
            <MoveRight />
          </a>
        </div>
        <div className="bg-card rounded-base p-4 md:p-12">
          <h2 className="text-text-primary text-2xl md:text-3xl font-heading  mb-4">
            Best react libraries around the web
          </h2>
          <p className=" font-body text-lg text-text-secondary mb-4">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers.
          </p>
          <a
            href="#"
            className="text-brand hover:underline font-body text-lg inline-flex items-center gap-2"
          >
            Read more
            <MoveRight />
          </a>
        </div>
      </div> */}
    </div>
  );
}
