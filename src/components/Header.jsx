import { faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { isLoginAuthContext } from "../context/Contextshare";

function Header() {
  const navigate = useNavigate();
  const{setIsLoginStatus} = useContext(isLoginAuthContext)
  const [token, setToken] = useState("");
  const handleLogout = () => {
    sessionStorage.removeItem("existingUser");
    sessionStorage.removeItem("token");  
    setIsLoginStatus(false)
    navigate("/");
  };
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));  
    }
  }, []);
  return (
    <>
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand href="#home" className="text-light">
            <Link
              to={"/"}
              className="text-light"
              style={{ textDecoration: "none" }}
            >
              <h4>
                <FontAwesomeIcon icon={faStackOverflow} className="me-2" />
                Project Fair
              </h4>
            </Link>
          </Navbar.Brand>
          {token && (
            <button
              className="btn btn-warning rounded-0"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faPowerOff} className="me-2" />
              Logout
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
