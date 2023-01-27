import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';

const JobsiteList = () => {
  const [jobsites, setJobsites] = useState([]);
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(0);
  const [onHold, setOnHold] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


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

  async function create(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const category = formData.get("category");
    const name = formData.get("name");
    const status = formData.get("status");
    const values = { category, name, status };

    const response = await fetch(`http://localhost:4000/api/sites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      alert("You created a new note succesfully!");
    }
  }

  return (
    <div className="p-12">
      <div className="w-full flex space-x-2 justify-center">
        <span className="px-24 py-2 bg-yellow-300 text-white"> {completed}</span>
        <span className="px-24 py-2 bg-red-300 text-white"> {onHold}</span>
        <span className="px-24 py-2 bg-green-300 text-white"> {inProgress}</span>
      </div>
      <button onClick={showModal} className="border border-black px-2 py-1 bg-blue-500 text-white mx-auto mt-5">
        Add a new jobsite
      </button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <form className="mt-12 flex flex-col --5 mx-auto" onSubmit={create}>
          <label>Name</label>
          <input className="border border-black p-1" type="text" name="name" required />
          <label>Category</label>
          <select className="border border-black p-1" name="category" required >
            <option value="sidewalkshed">Sidewalk Shed</option>
            <option value="scaffold">Scaffold</option>
            <option value="scaffold">Shoring</option>
          </select>
          <label>Status</label>
          <select className="border border-black p-1" name="status" required >
            <option value="completed">Completed</option>
            <option value="inprogress">In Progress</option>
            <option value="onhold">On Hold</option>
          </select>
          <button className="border border-black px-2 py-1 bg-green-500 text-white mt-12" type="submit">
            Submit
          </button>
        </form>
      </Modal>
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
