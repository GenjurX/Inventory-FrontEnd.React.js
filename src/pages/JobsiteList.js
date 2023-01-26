import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const JobsiteList = () => {
  const [jobsites, setJobsites] = useState([]);
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(0);
  const [onHold, setOnHold] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  React.useEffect(() => {
    async function sites() {
      const userId = localStorage.getItem("user_id");
      const response = await fetch(`http://localhost:4000/api/sites`);
      const data = await response.json();
      setJobsites(data);
    }
    sites();

    function counter() {
      let completedCounter = 0;
      let onHoldCounter = 0;
      let inProgressCounter = 0;
      for (let i = 0; i < jobsites.length; i++) {
        if (jobsites[i].status === "Completed") {
          completedCounter++;
          setCompleted(completedCounter);
        } else if (jobsites[i].status === "On Hold") {
          onHoldCounter++;
          setOnHold(onHoldCounter);
        } else if (jobsites[i].status === "In Progress") {
          inProgressCounter++;
          setInProgress(inProgressCounter);
        }
      }
    }
    counter();
  }, []);

  function navigateToSite(e) {
    if (e.target.dataset.number) {
      localStorage.setItem("id", e.target.dataset.number);
      navigate("/jobsite");
    }
  }

  return (
    <div className="p-12">
      <div className="w-full flex space-x-2 justify-center">
        <span className="px-24 py-2 bg-yellow-300 text-white">Completed: {completed}</span>
        <span className="px-24 py-2 bg-red-300 text-white">On hold: {onHold}</span>
        <span className="px-24 py-2 bg-green-300 text-white">In progress: {inProgress}</span>
      </div>
      <Link to="/create" className="border border-black px-2 py-1 bg-blue-500 text-white mx-auto mt-5">
        Add a new jobsite
      </Link>
      <div className="w-[800px] flex justify-between mx-auto mt-24">
        <span className="font-bold">Jobsite name</span>
        <span className="font-bold">Status</span>
      </div>
      <div className="flex">
        <div className="flex flex-col mx-auto mt-5 w-[800px]">
          {jobsites.map((jobsite) => (
            <div className="flex space-x-5 justify-between">
              <button data-number={jobsite.id} onClick={navigateToSite}>
                {jobsite.name}
              </button>
              <span>{jobsite.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsiteList;
