import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate();
  const { storeTokeninLS, API } = useAuth();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  // handle onchange inputs ---
  const handleOnchange = (e) =>{
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  // handle submit form --
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      
      const resData = await response.json();
      if(response.ok){
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        })
        toast.success(resData.message)
        storeTokeninLS(resData.token)
        navigate("/login");
      }else{
        toast.error(resData.extraDetails ?? resData.message)
      }
      
    } catch (error) {
      console.log("Register: ", error);
    }
  }


  return (
    <section>
        <div className="section-registration">
          <div className="container grid grid-two--cols">
            {/* image */}
            <div className="registration-image">
              <img
                src="/images/register.png"
                alt="girl trying to registration"
                width="400"
                height="400"
                loading="lazy"
              />
            </div>
            {/* registration form  */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">registration form</h1>
              <br />

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your name"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="phone">phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone"
                    minLength="10"
                    maxLength="20"
                    required
                    autoComplete="off"
                    value={(/^\d*$/).test(user.phone) ? user.phone : ""}
                    onChange={handleOnchange}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleOnchange}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">Register Now</button>
              </form>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Register;
