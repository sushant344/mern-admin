import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const { storeTokeninLS, API } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleOnchange = (e) =>{
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const resData = await response.json();
      if(response.ok){
        setUser({
          email: "",
          password: "",
        })
        toast.success(resData.message)
        storeTokeninLS(resData.token)
        navigate("/")
      }else{
        toast.error(resData.extraDetails ?? resData.message)
      }
    } catch (error) {
      console.log("Login: ", error);
    }
  }

  return (
    <section>
        <div className="section-registration">
          <div className="container grid grid-two--cols">
            {/* image */}
            <div className="registration-image">
              <img
                src="/images/login.png"
                alt="lets login accout"
                width="400"
                height="400"
                loading="lazy"
              />
            </div>
            {/* registration form  */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">login form</h1>
              <br />

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
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
                <button type="submit" className="btn btn-submit">Login Now</button>
              </form>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Login;
