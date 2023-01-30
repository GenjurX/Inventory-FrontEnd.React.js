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
  const [filter, setFilter] = useState("");
  const [color, setColor] = useState({ backgroundColor: 'yellow', color: 'white' });


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
  }, [jobsites]);


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
      alert("You created a new jobsite succesfully!");
      setTimeout(() => {
        window.location.reload()
      }, 1300)
    }
  }

  async function search(e) {
    e.preventDefault();
    if (e.target.value) {
      const response = await fetch(`http://localhost:4000/api/search/${e.target.value}`);
      const data = await response.json();
      setFilter(data);
    }
  }

  return (
    <div className="px-5">
      <div className="w-full flex space-x-2 text-center p-2 border border-grey-500 rounded-lg mt-3">
        <span className="px-24 py-5 bg-yellow-300 text-white w-[100%]">Completed: {completed}</span>
        <span className="px-24 py-5 bg-red-500 text-white w-[100%]">On Hold: {onHold}</span>
        <span className="px-24 py-5 bg-green-500 text-white w-[100%]">In Progress: {inProgress}</span>
      </div>
      <div className="flex items-center mt-5 justify-end">

        <form>
          <input onChange={search} type='text' placeholder='Search...' name='search' className='border border-black p-1' />
        </form>
        <button onClick={showModal} className="border border-green-500 rounded-lg px-10 py-1 bg-green-500 text-white ml-3">
          Create
        </button>
      </div>
      <Modal title="Add new jobsite" open={isModalOpen} onOk={create} onCancel={handleCancel}>
        <form className="mt-5 flex flex-col mx-auto" onSubmit={create}>
          <label className="font-bold">Name</label>
          <input className="border border-black p-1 bg-gray-100" type="text" name="name" placeholder="Enter the name" required />
          <div className="flex w-full mt-3">
            <div className="flex flex-col">
              <label className="font-bold">Category</label>
              <select className="border border-black p-2 w-64 bg-gray-100" name="category" required >
                <option value="Sidewalk Shed">Sidewalk Shed</option>
                <option value="Scaffold">Scaffold</option>
                <option value="Shoring">Shoring</option>
              </select>
            </div>
            <div className="flex flex-col ml-6 w-48">
              <label className="font-bold">Status</label>
              <select className="border border-black p-2 bg-gray-100" name="status" required >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
          <button className="px-2 py-1 bg-green-500 text-white mt-12" type="submit">
            Submit
          </button>
        </form>
      </Modal>
      <div className="flex">
        <table className="table-auto mt-5 w-[100%]">
          <thead>
            <tr className="font-bold">
              <th>Jobsite name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(filter) ? filter.map((jobsite, i) => {
              return (
                <tr key={i} className="even:bg-white odd:bg-gray-200 text-center">

                  <td className="text-blue-600 font-bold text-sm"><button data-number={jobsite.id} onClick={navigateToSite}>
                    {jobsite.name} </button>
                  </td>
                  <td><span>{jobsite.status}</span></td>
                </tr>
              )
            })
              : jobsites.map((jobsite, i) => {
                return (
                  <tr key={i} className="even:bg-white odd:bg-gray-200 text-center">

                    <td className="text-blue-600 font-bold text-sm"><button data-number={jobsite.id} onClick={navigateToSite}>
                      {jobsite.name} </button>
                    </td>
                    <td><span>{jobsite.status}</span></td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div >
  );
};

export default JobsiteList;
