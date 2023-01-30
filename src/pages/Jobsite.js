import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';


const Jobsite = () => {
  const [jobsite, setJobsite] = useState("");
  const [items, setItems] = useState("");
  const [visibleItems, setVisibleItems] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [itemsToRender, setItemsToRender] = useState("");
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
      const response = await fetch(`http://localhost:4000/api/items`);
      const data = await response.json();
      setItems(data);
    }
    fetchItems();

    function renderItems() {
      if (!filter) {
        setItemsToRender(items);
      }
      else {
        if (filter)
          setItemsToRender(filter);
      }
    }
    renderItems();

  }, [items, filter, jobsite]);

  function setVisible() {
    setVisibleItems(true);
  }

  async function update(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const item = formData.get('item');
    const quantity = formData.get('quantity');
    const description = formData.get('description');
    const notes = formData.get('notes');
    const values = { item, quantity, description, notes };

    const response = await fetch(`http://localhost:4000/api/item/${item_id}`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      alert(`You updated the item with id:${id} succesfully!`)
      setTimeout(() => {
        window.location.reload()
      }, 1300)
    }
  }

  async function search(e) {
    e.preventDefault();
    if (e.target.value) {
      const response = await fetch(`http://localhost:4000/api/search/items/${e.target.value}`);
      const data = await response.json();
      setFilter(data);
    }
  }


  return (
    <div className="p-12 flex">
      <div className="w-[400px]  h-[500px] relative border border-gray-300 p-5 mt-10">
        <div className="text-center w-full">
          {jobsite
            ? jobsite.map((jobsite) => {
              return (
                <div className="flex flex-col justify-center gap-y-3">
                  <span className="bg-gray-200 py-2 rounded-lg w-[100%]">{jobsite.name}</span>
                  <button onClick={setVisible} className="bg-gray-200 py-2 rounded-lg w-[100%]">{jobsite.category}</button>
                </div>
              );
            })
            : null}
        </div>
        <Link to="/" className="absolute bottom-1 left-[38%] px-5 py-1 bg-blue-500 text-white text-center">
          Go back
        </Link>
      </div>
      <div className="w-[800px] h-[500px]">
        <div className="flex justify-between">
          <form className=' ml-10'>
            <input onChange={search} type='text' placeholder='Search your items...' name='search' className='border border-gray-200 rounded-lg mb-2 p-1' />
          </form>
          <button onClick={() => {
            setVisibleItems(false);
            setFilter("");
          }
          }>X</button>
        </div>
        <table className="text-center table-auto w-full border border-gray-300 ml-10">
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
            {(itemsToRender && visibleItems) ? itemsToRender.map((item, i) => {
              return (<tr key={i} className="even:bg-white odd:bg-gray-200">
                <td>{item.id}</td>
                <td className="hover:cursor-pointer" data-number={item.id} onDoubleClick={showModal}>{item.item}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
                <td>{item.notes}</td>
              </tr>
              )
            }) : null
            }
          </tbody>

          <Modal title="Update item" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <form onSubmit={update} className="flex flex-col px-3 bg-white gap-y-2">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label className="font-bold">Item</label>
                  <input type='text' name='item' className="border border-black p-1 w-52" placeholder="Item" required />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold">Quantity</label>
                  <input type='number' name='quantity' className="border border-black p-1 w-52" placeholder="Quantity" required />
                </div>
              </div>
              <label className="font-bold">Description</label>
              <textarea type='text' name='description' className="border border-black p-1" placeholder="Description" required />
              <label className="font-bold">Notes</label>
              <textarea type='text' name='notes' className="border border-black p-1" placeholder="Notes" required />
              <button className="mt-3 bg-green-500 text-white px-5 py-2" type='submit' >Update</button>
            </form>
          </Modal>
        </table>
      </div>
    </div>

  );
};

export default Jobsite;
