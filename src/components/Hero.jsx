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
        <div className="inline-flex items-center justify-center">
          <div className="text-center lg:text-left p-4 md:p-10 my-20">
            <h1 className="text-text-primary tracking-tighter text-3xl md:text-6xl font-heading my-6">
              The community's just getting Bigger!!
            </h1>
            <p className="md:text-lg font-normal text-text-secondary mb-6">
              Discover, share, and organize the best learning resources - from
              code to concepts - all in one place.
            </p>
            <div className="block md:inline-flex md:gap-3">
              <Button
                variant="primary"
                size="lg"
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
                size="lg"
                className="inline-flex gap-2 mt-2 md:mt-0"
                onClick={handleUploadClick}
              >
                Upload your own
                <Upload size={20} />
              </Button>
            </div>
          </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-base p-4 md:p-12">
          <h2 className="text-text-primary text-xl md:text-2xl font-heading  mb-4">
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
          <h2 className="text-text-primary text-xl md:text-2xl font-heading  mb-4">
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
            <MoveRight />
          </a>
        </div>
      </div>
    </div>
  );
}
