import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';


const Jobsite = () => {
  const [jobsite, setJobsite] = useState("");
  const [items, setItems] = useState("");
  const [visibleItems, setVisibleItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = localStorage.getItem("id");

  const showModal = (e) => {
    localStorage.setItem('item_id', e.target.dataset.number)
    setIsModalOpen(true);
  };
  const item_id = localStorage.getItem("item_id");

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    async function sites() {
      const response = await fetch(`http://localhost:4000/api/sites/${id}`);
      const data = await response.json();
      setJobsite(data);
    }
    sites();
    async function fetchItems() {
      const response = await fetch(`http://localhost:4000/api/sites/${id}/items`);
      const data = await response.json();
      setItems(data);
    }
    fetchItems();

  }, []);

  function setVisible() {
    setVisibleItems(true);
  }

  async function update(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get('title');
    const category = formData.get('category');
    const date = formData.get('date');
    const description = formData.get('description');
    const values = { title, category, date, description };

    const response = await fetch(`http://localhost:4000/api/item/${item_id}`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(values)
    })
    const data = await response.json();
    if (response.ok) {
      alert(`You updated the item with id:${id} succesfully!`)
    }
  }


  return (
    <div className="p-12">
      <Link to="/" className="border border-black px-2 py-1 bg-green-500 text-white mx-auto">
        Go back
      </Link>
      <div className="flex mt-12">
        <div>
          {jobsite
            ? jobsite.map((jobsite) => {
              return (
                <div className="space-x-3 flex flex-col justify-center gap-y-3">
                  <span className="border-b border-black">{jobsite.name}</span>
                  <button onClick={setVisible} className="bg-green-500 text-white px-5 py-2">{jobsite.category}</button>
                </div>
              );
            })
            : null}
        </div>
        <table className="text-center border border-black table-auto w-[800px] h-[600px] overflow:scroll ml-48">
          <thead>
            <tr>
              <th>Nr</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {(items && visibleItems) ? items.map((item, i) => {
              return (<tr key={i}>
                <td>{item.id}</td>
                <td className="hover:cursor-pointer" data-number={item.id} onClick={showModal}>{item.item}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
                <td>{item.notes}</td>
              </tr>
              )
            }) : null
            }
          </tbody>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <form onSubmit={update} className="flex flex-col px-3 bg-gray-200 border border-black gap-y-2">
              <label>Item</label>
              <input type='text' name='item' />
              <label>Quantity</label>
              <input type='number' name='quantity' />
              <label>Description</label>
              <input type='text' name='description' />
              <label>Notes</label>
              <input type='text' name='notes' />
              <button className="bg-green-500 text-white px-5 py-2" type='submit'>Update</button>
            </form>
          </Modal>
        </table>

      </div>
    </div >
  );
};

export default Jobsite;
