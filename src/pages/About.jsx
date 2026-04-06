import React from 'react'

export default function About() {
  return (
    <div className="mt-30 mx-auto">
      <h1 className="text-4xl md:text-5xl lg:text-6xl pl-2 mx-5 md:mx-10 my-2 border-l-8 text-text-primary font-heading border-brand ">
        About
      </h1>
      <div className='p-6 md:p-10'>
        <p className="text-text-secondary font-body text-xl">
          ShareStack is a community-driven platform designed to make knowledge
          sharing simple, structured, and accessible. Whether you're a
          developer, student, or tech enthusiast, ShareStack enables you to
          discover, share, and collaborate on valuable learning resources in one
          place.
        </p>
        <p className="text-text-secondary font-body my-5 text-xl">
          From code snippets and tutorials to full-fledged projects, our goal is
          to bridge the gap between learning and building by creating a space
          where knowledge is not just consumed-but contributed.
        </p>
        <p className="text-text-secondary font-body text-xl">
          We believe that the best way to grow is by sharing what you know and
          learning from others. ShareStack empowers users to do exactly that,
          with a seamless experience built for modern learners.
        </p>
      </div>
    </div>
  );
}
