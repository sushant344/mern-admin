import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const params = useParams();
  const { authUserToken, API } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // get user by id --
  const getUserData = async () => {
    try {
      const response = await fetch(
        `${API}/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authUserToken,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data.message);
      }
    } catch (error) {
      console.log("Get user update page:", error);
    }
  };

  // handle onchange event --
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  useEffect(() => {
    getUserData();
  }, []);

  // handle submit and update data --
  const handleOnsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authUserToken,
          },
          body: JSON.stringify(user),
        }
      );

      const resData = await response.json();
      if (response.ok) {
        toast.success(resData.message);
      } else {
        toast.error(resData.extraDetails ?? resData.message);
      }
    } catch (error) {
      console.log("Update user data admin page:", error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleOnsubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={user.username}
                  onChange={handleOnchange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleOnchange}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Mobile</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleOnchange}
                  required
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default AdminUpdate;
