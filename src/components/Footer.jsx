import {
  faFacebook,
  faInstagram,
  faSquareWhatsapp,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="container-fluid bg-success p-5">
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-light">
              <FontAwesomeIcon icon={faStackOverflow} className="me-2" />
              Project Fair
            </h3>
            <p className="mt-3" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
              qui? Natus sapiente quos, eius modi, voluptas, hic obcaecati culpa
              quibusdam ratione voluptate dolorum alias iure at maiores quaerat
              quisquam! Repellendus.
            </p>
          </div>
          <div className="col-md-2 d-md-flex justify-content-center align-items-center flex-column">
            <div className="">
              <h4 className="text-light ">Links</h4>
              <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                <p className="mt-3">Home</p>
              </Link>
              <Link
                to={"/project"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>Project</p>
              </Link>
              <Link
                to={"/dashboard"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>Dashboard</p>
              </Link>
            </div>
          </div>
          <div className="col-md-2 d-md-flex justify-content-center align-items-center flex-column">
            <div className="">
              <h4 className="text-light">Guides</h4>
              <p className="mt-3">React</p>
              <p>Bootstrap</p>
              <p>Bootswatch</p>
            </div>
          </div>
          <div className="col-md-4">
            <h4 className="text-light">Contact Us</h4>
            <div className="d-flex mt-3">
              <input
                type="text"
                placeholder="Email Id"
                className="form-control rounded-0"
              />
              <button className="btn btn-warning rounded-0">Subscribe</button>
            </div>
            <div className="d-flex mt-4 justify-content-between text-light">
              <FontAwesomeIcon icon={faFacebook} className="fa-2x" />
              <FontAwesomeIcon icon={faTwitter} className="fa-2x" />
              <FontAwesomeIcon icon={faInstagram} className="fa-2x" />
              <FontAwesomeIcon icon={faSquareWhatsapp} className="fa-2x" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
