import Hero from '../components/Hero';
import { useFirebase } from '../context/Firebase';
import { categories } from '../data/addResourceData';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const firebase = useFirebase();
  const nav = useNavigate();
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section className="py-8 px-4 mx-auto lg:py-16 bg-linear-to-t from-gray-200 to-neutral-primary">
        <div className="max-w-7xl rounded-base mx-auto bg-neutral-primary p-4 md:p-12">
          <h1 className="text-2xl md:text-4xl  mb-10 font-bold text-center">
            Popular Topics
          </h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div>
              {categories.map((category) => (
                <button
                  onClick={(e) => nav(`/resources/${category.value}`)}
                  key={category.value}
                  className="inline-flex items-center border text-body text-s m-2 font-medium px-3 py-1 cursor-pointer hover:bg-black hover:text-white rounded-2xl"
                >
                  {category.label}
                </button>
              ))}
            </div>
            <img
              src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
              alt=""
              className="rounded-base"
            />
          </div>
        </div>
      </section>
      <section className="h-full bg-neutral-950 p-10">
        <h1 className="text-2xl md:text-4xl text-center text-white mb-10 font-bold">
          Trending Resources
        </h1>
      </section>
      <section className="h-full p-10">
        <h1 className="text-2xl md:text-4xl  mb-10 font-bold text-center">
          Trending Blogs
        </h1>
      </section>
    </div>
  );
}
