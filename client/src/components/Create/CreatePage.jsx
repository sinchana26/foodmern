import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';
import Main from "../Main/MainPage";
import "./create.css";
//setting user details data
const Create = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    foodItem: "",
    amount: "",
    status: "",
  });
//Assigning form input value to its variables first name,food item,amount,status
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
//end point to Save details of customer
  const url = "https://localhost:8080/api/details";
//This method handles saving data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('User Details saved');
    try {
      const { Details: res } = await axios.post(url, data)
      console.log(res.status("success"));

    } catch (error) {
      console.log("error");
    }
  };
//this method navigates to edit page
  const viewDetails = () => {
    navigate('/edit');
  };

  return (
    <div class="container " >
      <div>
        < Main />
      </div>
      <div class="card card text-center" >
        <div>
          <img width="500" height="100" src="./Assets/food.jpg" alt="food"></img>
        </div>
        <form onSubmit={handleSubmit}>
          <h1 id="create" class="card-header">CREATE</h1>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li id="list1" class="list-group-item">
             {/* Taking input as a first name */}
                <input id="input"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                />
              </li>
              <li id="list2" class="list-group-item">
                {/* Taking input as food item */}
                <input id="input"
                type="text"
                placeholder="Food Item"
                name="foodItem"
                onChange={handleChange}
                value={data.foodItem}
                required
              />
              </li>
              <li id="list3" class="list-group-item">
                {/* Taking input as amount */}
                <input id="input"
                type="text"
                placeholder="Amount"
                name="amount"
                onChange={handleChange}
                value={data.amount}
                required
              /></li>
              <li id="list4" class="list-group-item"> 
              {/* Taking input as status */}
              <input id="input"
                type="text"
                placeholder="Status"
                name="status"
                onChange={handleChange}
                value={data.status}
                required
              /></li>

            </ul>
          </div>
          <div id="footer" class="card-footer">
            {/* On clicking this button saves customer details to database  */}
            <button id="saveDetails" variant="success" type="submit" >
              Save Details
            </button>
            {/* On clicking this button displays all customers details by navigating to edit page */}
            <Button id="viewDetails" onClick={viewDetails}>View Details</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Create;
