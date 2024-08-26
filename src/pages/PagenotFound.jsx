import React from "react";
import { Link } from "react-router-dom";

function PagenotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "100vh" }}
    >
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10 d-flex justify-content-center align-items-center flex-column">
          <img
            src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif"
            alt="noimage"
            width={"100%"}
            height={"450px"}
          />
          <h1 className="mt-3">Look like you're lost</h1>
          <h4 className="mt-2">The page you are looking is unavailable</h4>
          <Link to={'/'}><button className="btn btn-success mt-5 rounded-0">Back Home</button></Link>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
}

export default PagenotFound;
