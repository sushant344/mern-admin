import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const AdminContacts = () => {

  const { authUserToken, API } = useAuth();
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  // get all contacts --
  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authUserToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }else{
        navigate("/denied")
      }
    } catch (error) {
      console.log("all contacts admin data:", error);
    }
  };


  // delete contacts --
  const deleteContact = async(id)=>{
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authUserToken,
        },
      });
      if(response.ok){
        getAllContactsData();
      }
    } catch (error) {
      console.log("deleted contact admin:", error);
    }
  }


  useEffect(() => {
    getAllContactsData();
  }, []);

  const trStyle = {
    gridTemplateColumns: "repeat(4, minmax(10rem, 1fr))"
  }


  return (
    <>
    <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr style={trStyle}>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((curContacts, index) => {
                const { username, email, message, _id } = curContacts;
                return (
                  <tr key={username+index} style={trStyle}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td >{message}</td>
                    <td>
                      <button className="btn btn-delete" onClick={()=> deleteContact(_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminContacts