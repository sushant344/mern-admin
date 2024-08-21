import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

const AdminUsers = () => {
  const { authUserToken, API } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // get all users ---
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authUserToken,
        },
      });
      if (response.ok) {
        const data = await response.json();  
        setUsers(data.users);
      }else{
        navigate("/denied")
      }
    } catch (error) {
      console.log("all users admin data:", error);
    }
  };


  // delete user ---
  const deleteUser = async(id)=>{
    try {
      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authUserToken,
        },
      });
      if(response.ok){
        getAllUsersData();
      }
    } catch (error) {
      console.log("deleted user admin:", error);
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                const { username, email, phone, _id } = curUser;
                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td><Link to={`/admin/users/${_id}/edit`}>Edit</Link></td>
                    <td>
                      <button className="btn btn-delete" onClick={()=>deleteUser(_id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
