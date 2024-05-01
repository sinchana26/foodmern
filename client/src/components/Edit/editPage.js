import { useState, useEffect } from "react";
import React from 'react';
import axios from 'axios';
import UpdateForm from "../Update/updatePage";
import Main from "../Main/MainPage";
import { useNavigate } from 'react-router-dom';
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

import Modal from 'react-bootstrap/Modal';
import "./edit.css";

const Edit = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [id, setId] = useState("");

  const [datas, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);
//This method fetches customers data from API end point get
  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:8080/api/details/get");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
//this method deletes specific customer by using id
  const onDeleteClick = (id, user) => {
    axios.delete(`https://localhost:8080/api/details/Details/${id}`)
      .then(res => {
        if (window.confirm('Are you sure want to delete : ' + user));
        console.log(res.data);
        fetchData();
      })
      .catch(err => console.log(err));
  };
//this method assign id value to id variable
  const onEditClick = (id, user) => {
    setId(id);
    alert("Update Customer : " + user);
  };
//This method navigates to create page
  const CreatNewButton = () => {

    navigate('/create');
  };

  return (

    <div>
      < Main />
      <div>
      <button  id="createBtn" onClick={CreatNewButton} >Create New User</button>
      </div>
      <>
      {/* Dialog popup for updating customer details  */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <UpdateForm id={id} />
            </div>                
            <button id="closeBtn" onClick={() => { handleClose(); fetchData() }}>
              Close
            </button>
            </Modal.Body>
        </Modal>
      </>
{/* Table which displays the customer dertails */}
      <Container className="px-0">
        <Table striped bordered hover responsive  >
          <thead class="text-center ">
            <tr>
              <th id="th">Customer Name</th>
              <th id="th">Food Item</th>
              <th id="th">Amount</th>
              <th id="th">Status</th>
              <th id="th">Operations</th>
            </tr>
          </thead>
          <tbody class="text-center">
            {datas.map((user) => (
              <tr>
                <td key={user._id}>{user.firstName}
                </td>
                <td>{user.foodItem}</td>
                <td>{user.amount}</td>
                <td>{user.status}</td>
                <div class="text-center">
                  {/* On clicking this button deletes customer using id */}
                  <button className="funButtons" onClick={() => onDeleteClick(user._id, user.firstName)}>DELETE</button>
                  {/* On clicking this button dialog popup appears with specific user we can upate details */}
                  <button className="funButtons1" onClick={() => { onEditClick(user._id, user.firstName); handleShow() }}>UPDATE</button>
                </div>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Container className="px-0">

      </Container>
    </div>
  );
}

export default Edit;
