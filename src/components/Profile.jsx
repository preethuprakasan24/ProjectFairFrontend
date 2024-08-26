import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { serverUrl } from "../services/serverUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileUpdateApi } from "../services/allApi";

function Profile() {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: "",
  });

  const [existingImage, setExistingImage] = useState("");
  const [preview, setPreview] = useState("");
  const[updateStatus, setUpdateStatus] = useState({})

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        ...userDetails,
        username: user.username,
        email: user.email,
        password: user.password,
        github: user.github,
        linkedin: user.linkedin,
      });
      setExistingImage(user.profile);
    }
  }, [updateStatus]);

  console.log(userDetails);

  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] });
  };

  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile));
    }
  }, [userDetails.profile]);
  console.log(preview);

  const handleUpdate = async () => {
    const { username, email, password, github, linkedin, profile } =
      userDetails;
    if (!github || !linkedin) {
      toast.info("Please fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", existingImage);

      const token = sessionStorage.getItem("token");
      if (token) {
        if (preview) {
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };
          const result = await profileUpdateApi(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            toast.success("Profile updated successfully");
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));
            setUpdateStatus(result.data)
          } else {
            toast.error("something went wrong");
          }
        }
      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await profileUpdateApi(reqBody, reqHeader);
        console.log(result);
        if (result.status === 200) {
          toast.success("Profile updated successfully");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          setUpdateStatus(result.data)
        } else {
          toast.error("something went wrong");
        }
      }
    }
  };

  return (
    <div
      className="shadow p-4 mb-5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="d-flex mt-3">
        <h3 className="text-success">Profile</h3>
        <div className="ms-auto">
          <button
            className="btn btn-outline-primary"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <label htmlFor="profileImg">
              <input
                type="file"
                style={{ display: "none" }}
                id="profileImg"
                onChange={(e) => handleFile(e)}
              />
              {existingImage === "" ? (
                <img
                  src={
                    preview
                      ? preview
                      : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                  } 
                  alt=""
                  width={"180px"}
                  height={"180px"}
                  style={{borderRadius:"50%"}}
                />
              ) : (
                <img
                  src={
                    preview ? preview : `${serverUrl}/uploads/${existingImage}`
                  }
                  alt="noimage"
                  width={"180px"}
                  height={"180px"}
                  style={{borderRadius:"50%"}}
                />
              )}
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Github"
              value={userDetails.github}
              className="form-control"
              onChange={(e) =>
                setUserDetails({ ...userDetails, github: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="LinkedIn"
              value={userDetails.linkedin}
              className="form-control"
              onChange={(e) =>
                setUserDetails({ ...userDetails, linkedin: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-success w-100" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </Collapse>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default Profile;
