import Hero from '../components/Hero';
import { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { categories } from '../data/addResourceData';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import BlogCard from '../components/BlogCard';
import Button from '../components/Button';
import { dots, heroVector } from '../assets/Elements';


export default function LandingPage() {
  const firebase = useFirebase();
  const [resources, setResources] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    firebase.getAllResources().then((resources) => setResources(resources));
    firebase.getAllBlogs().then((blogs) => setBlogs(blogs));
   }, [firebase]);

  const nav = useNavigate();
  
  
  return (
    <div>
      <section className="relative overflow-hidden bg-background lg:min-h-screen flex justify-center items-center">
        {/* <div className="absolute right-60 top-10 text-border opacity-50 w-80 z-auto">
          {heroVector}
        </div> */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center z-0 pointer-events-none">
          <div className="absolute animate-pulse-slow w-150 h-150 md:w-225 md:h-225 rounded-full bg-[radial-gradient(circle,rgba(var(--color-brand-rgb),0.25)_0%,transparent_100%)] blur-3xl" />
          <div className="absolute w-235 h-235 md:w-325 md:h-325 rounded-full border border-border/35 " />
          <div className="absolute w-180 h-180 md:w-250 md:h-250 rounded-full border border-border/50" />
          <div className="absolute w-125 h-125 md:w-175 md:h-175 rounded-full border border-border" />
        </div>
        <Hero />
      </section>

      <section className="py-8 px-4 mx-auto lg:py-16 bg-linear-to-t from-brand-softer to-background">
        <div className="max-w-7xl p-6 md:p-12 mx-auto text-xl font-body text-text-primary my-15">
          <p>
            ShareStack is built on a simple idea, knowledge grows when it’s
            shared.
          </p>
          <p className="my-5">
            In a world full of scattered resources, ShareStack brings everything
            into one place. Whether it's code, tutorials, or learning materials,
            users can contribute, explore, and collaborate effortlessly.
          </p>
          <p>
            We’re not just building a platform, we’re building a community
            where developers help developers, learners become contributors, and
            ideas turn into real-world skills.
          </p>
        </div>
        <div className="max-w-7xl rounded-base mx-auto bg-background p-6 md:p-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-text-primary mb-20 font-heading text-center lg:text-left">
            Resources by <i>Categories</i>
          </h1>
          <div className="grid md:gap-6 grid-cols-1 md:grid-cols-2">
            <div>
              {categories.slice(0, 6).map((category) => {
                const Icons = category.icons;
                return (
                  <button
                    onClick={(e) => nav(`/resources/${category.value}`)}
                    key={category.value}
                    className=" flex items-center py-2 cursor-pointer border-b border-border w-full"
                  >
                    <Icons className="text-brand-medium" />
                    <span className="text-text-secondary m-2 font-body text-xl px-3 py-1 ">
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div>
              {categories.slice(6, 12).map((category) => {
                const Icons = category.icons;
                return (
                  <button
                    onClick={(e) => nav(`/resources/${category.value}`)}
                    key={category.value}
                    className=" flex items-center py-2 cursor-pointer border-b border-border w-full"
                  >
                    <Icons className="text-brand-medium" />
                    <p className="text-text-secondary text-xl m-2 font-body px-3 py-1 ">
                      {category.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="text-brand-softer overflow-hidden mt-5">{dots}</div>
      <section className="h-full max-w-7xl mx-auto bg-background p-4 lg:p-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center lg:text-left text-text-primary my-20 font-heading">
          Trending <i>Resources</i>
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.slice(0, 3).map((resource) => (
            <ResourceCard
              key={resource.id}
              id={resource.id}
              hideDelete={true}
              {...resource}
            />
          ))}
        </div>
        <Button
          variant="primary"
          size="md"
          className="mx-auto mt-10"
          onClick={() => {
            nav("/resources");
          }}
        >
          See more
        </Button>
      </section>
      <section className="h-full max-w-7xl mx-auto p-4 lg:p-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-text-primary my-20 font-heading text-center lg:text-left">
          Trending <i>Blogs</i>
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
          {blogs.slice(0, 2).map((blog) => (
            <BlogCard key={blog.id} id={blog.id} hideDelete={true} {...blog} />
          ))}
        </div>
        <Button
          variant="primary"
          size="md"
          className="flex mx-auto my-10"
          onClick={() => {
            nav("/blogs");
          }}
        >
          See more
        </Button>
      </section>
    </div>
  );
}
