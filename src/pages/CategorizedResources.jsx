import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import ResourceCard from "../components/ResourceCard";

export default function CategorizedResources() {
  const params = useParams();
  const firebase = useFirebase();
  const [resourceData, setResourceData] = useState([]);

  useEffect(() => {
    if (!params.category) return;
    let mounted = true;
    firebase.categorizedResources(params.category).then((snapshot) => {
      if (!mounted) return;
      const resources = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setResourceData(resources);
    });
    return () => {
      mounted = false;
    };
  }, [params.category, firebase]);

  return (
    <div className="mx-auto mt-30">
      <h1 className="text-3xl md:text-5xl pl-2 mx-10 my-2 border-l-8 font-bold border-brand capitalize">
        {params.category}
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {resourceData.length === 0 ? (
          <p>No resources found for this category.</p>
        ) : (
          resourceData.map(({ id, ...rest }) => (
            <ResourceCard key={id} id={id} hideDelete={true} {...rest} />
          ))
        )}
      </div>
    </div>
  );
}
