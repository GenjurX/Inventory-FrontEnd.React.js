import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Jobsite = () => {
  const [jobsite, setJobsite] = useState("");
  const id = localStorage.getItem("id");

  React.useEffect(() => {
    async function sites() {
      const response = await fetch(`http://localhost:4000/api/sites/${id}`);
      const data = await response.json();
      setJobsite(data);
    }
    sites();
  }, []);

  return (
    <div className="p-12">
      <Link to="/" className="border border-black px-2 py-1 bg-green-500 text-white mx-auto">
        Go back
      </Link>
      {jobsite
        ? jobsite.map((jobsite) => {
            return (
              <div className="space-x-3 flex justify-center">
                <span>{jobsite.name}</span>
                <span>{jobsite.category}</span>
                <span>{jobsite.status}</span>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Jobsite;
