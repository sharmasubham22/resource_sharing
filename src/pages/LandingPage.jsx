import Hero from '../components/Hero';
import { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { categories } from '../data/addResourceData';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import BlogCard from '../components/BlogCard';
import Button from '../components/Button';
import { dots } from '../assets/Elements';


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
      <section>
        <Hero />
      </section>
      <div className="text-brand-softer">{dots}</div>

      <section className="py-8 px-4 mx-auto lg:py-16 bg-linear-to-t from-brand-softer to-background">
        <div className="max-w-7xl rounded-base mx-auto bg-background p-4 md:p-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-20 font-heading text-center lg:text-left">
            Resources by Categories
          </h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
                    <p className="text-text-secondary text-md m-2 font-medium px-3 py-1 ">
                      {category.label}
                    </p>
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
                    <p className="text-text-secondary text-md m-2 font-medium px-3 py-1 ">
                      {category.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="h-full max-w-7xl mx-auto bg-background p-4 lg:p-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center lg:text-left text-text-primary my-20 font-heading">
          Trending Resources
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
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-text-primary my-20 font-heading text-center lg:text-left">
          Trending Blogs
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0">
          {blogs.slice(0, 2).map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              hideDelete={true}
              {...blog}
            />
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
