import React from "react";
import { Link } from "react-router-dom";

const Create = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
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
  };
  return (
    <div className="p-12">
      <Link to="/" className="border border-black px-2 py-1 bg-green-500 text-white mx-auto">
        Go back
      </Link>
      <form className="mt-12 flex flex-col w-[500px] mx-auto" onSubmit={onSubmit}>
        <label>Name</label>
        <input className="border border-black p-1" type="text" name="name" required />
        <label>Category</label>
        <input className="border border-black p-1" type="text" name="category" required />
        <label>Status</label>
        <input className="border border-black p-1" type="text" name="status" required />
        <button className="border border-black px-2 py-1 bg-green-500 text-white mt-12" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
