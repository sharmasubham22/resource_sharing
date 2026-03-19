import Hero from '../components/Hero';
import { useState, useEffect } from 'react';
import { useFirebase } from '../context/Firebase';
import { categories } from '../data/addResourceData';
import { useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import Button from '../components/Button';


export default function LandingPage() {
  const firebase = useFirebase();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    firebase.getAllResources().then((resources) => setResources(resources));
   }, [firebase]);

  const nav = useNavigate();
  
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section className="py-8 px-4 mx-auto lg:py-16 bg-linear-to-t from-brand-softer to-background">
        <div className="max-w-7xl rounded-base mx-auto bg-background p-4 md:p-12">
          <h1 className="text-2xl md:text-4xl text-text-primary mb-10 font-bold text-center">
            Resources by Categories
          </h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div>
              {categories.map((category) => {
                const Icons = category.icons;
                return (
                  <button
                    onClick={(e) => nav(`/resources/${category.value}`)}
                    key={category.value}
                    className=" flex items-center mb-2 pb-2 cursor-pointer border-b border-border w-full"
                  >
                    <Icons className="text-brand-medium" />
                    <p className="text-text-secondary text-md m-2 font-medium px-3 py-1 ">
                      {category.label}
                    </p>
                  </button>
                );
              })}
            </div>
            <img
              src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
              alt=""
              className="rounded-base"
            />
          </div>
        </div>
      </section>
      <section className="h-full bg-background p-10">
        <h1 className="text-2xl md:text-4xl text-center text-text-primary mb-10 font-bold">
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
        <Button className="mx-auto float-end">See more</Button>
      </section>
      <section className="h-full p-10">
        <h1 className="text-2xl md:text-4xl text-text-primary mb-10 font-bold text-center">
          Trending Blogs
        </h1>
      </section>
    </div>
  );
}
