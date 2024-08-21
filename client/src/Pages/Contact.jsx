import React, { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {

  // when user logged in by default fill username and email in contact form ----
  const { user, API } = useAuth();
  
  const [userData, setUserData] = useState(true);
  const [contact, setContact] = useState(defaultContactFormData);

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });
    
    setUserData(false);
  }

  // handle onchange inputs ---
  const handleOnchange = (e) =>{
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    })
  };

  // handle submit form ---
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/form/contact`, {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
      });

      // const resData = await response.json();
      if(response.ok){
        setContact({
          message: ""
        });
        toast.success("Message sent")
      }else{
        toast.error("Error!! message not sent");
      }
    } catch (error) {
      console.log("Contact: ", error);
    }
  }

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two--cols">
          <div className="contact-img">
            <img src="/images/support.png" alt="we are always ready to help" loading="lazy" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your name"
                  autoComplete="off"
                  required
                  value={contact.username}
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
                  autoComplete="off"
                  required
                  value={contact.email}
                  onChange={handleOnchange}
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  placeholder="Type here.."
                  required
                  cols="30"
                  rows="6"
                  value={contact.message}
                  onChange={handleOnchange}
                ></textarea>
              </div>

              <div>
                <button type="submit" className="btn btn-submit">submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143470.02396388914!2d72.99641421119814!3d19.1029546695228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1723650195025!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="my location"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
