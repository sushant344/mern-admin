import React from "react";
import { useAuth } from "../store/auth";

const Services = () => {
  const { services } = useAuth();

  if (!services) {
    return <p>Loading services...</p>; 
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services </h1>
      </div>

      <div className="container grid grid-three--cols">
        {services.map((curElem, index) => {
          const { price, description, provider, service } = curElem;

          return (
            <div className="card" key={service + index}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="our services info"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two--cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>
                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
