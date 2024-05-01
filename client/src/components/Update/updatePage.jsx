import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./update.css";

const UpdateForm = ({ id }) => {

  const [formData, setFormData] = useState({
    firstName: '',
    foodItem: '',
    amount: '',
    status: '',
  });
//this method fetches specific customer details by id for updating the details
  useEffect(() => {
    const fetchRecord = async () => {

      const response = await axios.get(`https://localhost:8080/api/details/data/${id}`);
      setFormData(response.data);
      console.log(response.data);
    };

    fetchRecord();
  }, [id]);


//after updating data this method assigns values to variables
  const onChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
//this method save the updated data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:8080/api/details/update/${id}`, formData);
      alert('Form updated successfully!');
    } catch (error) {
      alert('Failed to update form. Please try again.');
    }
  };


  return (
    <div class="container">
      <div class="card card text-center" >
        <h1 id="header" class="card-header">CUSTOMERS DETAILS UPDATE</h1>
        {/* Update form */}
        <form onSubmit={handleSubmit}>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li id="list" class="list-group-item">
                <div>
                  <label id="label" >First Name</label>
                  {/* Taking input as first name */}
                  <input
                    class="form-control"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChange}
                  />
                </div>
              </li>
              <li id="list" class="list-group-item">
                <div>
                  <label id="label">Food Item</label>
                  {/* Taking input as food item */}
                  <input
                    class="form-control"
                    type="text"
                    name="foodItem"
                    value={formData.foodItem}
                    onChange={onChange}
                  />
                </div>
              </li>
              <li id="list" class="list-group-item">
                <div>
                  <label id="label">Amount</label>
                  {/* Taking input as amount */}
                  <input
                    class="form-control"
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={onChange}
                  />
                </div>
              </li>
              <li id="list" class="list-group-item">
                <div>
                  <label id="label">Status</label>
                  {/* Taking input as status */}
                  <input
                    class="form-control"
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                  />
                </div>
              </li>
              <button className='UpdateBtn' type="submit">Update</button>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateForm;
