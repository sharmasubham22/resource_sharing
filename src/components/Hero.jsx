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
            <p className="text-7xl md:text-8xl lg:text-9xl">Build. Share. Grow.</p>
            <p className="text-7xl md:text-8xl lg:text-9xl">
              Together!!{" "}
            </p>
           
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
    </div>
  );
}
