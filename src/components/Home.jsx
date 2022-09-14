import React from "react";
import Products from "./Products";

//Home Component
function Home() {
  return (
    <div className="hero">
      <div className="card bg-dark text-white border-0">
        <img
          src="/assets/photo.avif"
          className="card-img"
          alt="Background"
          height="560"
        />
        <div className="card-img-overlay d-flex justify-content-center">
          <div className="container">
            <h5 className="card-title display-3 fw-bolder">
              NEW COLLECTION AVAILABLE
            </h5>
            <p className="card-text">CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

export default Home;
