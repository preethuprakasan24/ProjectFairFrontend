import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectApi } from "../services/allApi";
import { addResponseContext } from "../context/Contextshare";

function AddProject() {
  const [show, setShow] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImg: "",
  });
  const [preview, setPreview] = useState("");

  const [key, setKey] = useState(false);

  console.log(projectDetails);
  const { setAddResponse } = useContext(addResponseContext);

  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  const handlefile = (e) => {
    // console.log(e.target.files[0]);
    setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] });
  };
  // console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectImg) {
      setPreview(URL.createObjectURL(projectDetails.projectImg));
    }
  }, [projectDetails.projectImg]);

  // console.log(preview);

  const handleClose1 = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImg: "",
    });
    setPreview("");

    if (key === false) {
      setKey(true);
    } else {
      setKey(false);
    }
  };

  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImg } =
      projectDetails;
    // console.log(title, language, github, website, overview, projectImg);

    if (
      !title ||
      !language ||
      !github ||
      !website ||
      !overview ||
      !projectImg
    ) {
      toast.info("please fill the fields completely");
    } else {
      //formData class is used to send request with uploaded content
      //1)create object

      const reqBody = new FormData();

      //append - to add data to the object

      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      reqBody.append("projectImg", projectImg);

      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await addProjectApi(reqBody, reqHeader);
        console.log(result);

        if (result.status === 200) {
          setAddResponse(result.data);
          toast.success("Project added successfully");
          handleClose();
        } else {
          toast.error("Something went wrong");
          handleClose();
        }
      }
    }
  };
  return (
    <>
      <button className="btn btn-success rounded-0" onClick={handleShow}>
        Add Project
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row ">
            <div className="col-md-6  d-flex justify-content-center align-items-center ">
              <label htmlFor="projImg">
                <input
                  type="file"
                  id="projImg"
                  style={{ display: "none" }}
                  key={key}
                  onChange={(e) => handlefile(e)}
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_1280.png"
                  }
                  alt="noImage"
                  className="w-100"
                />
              </label>
            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input
                  type="text"
                  value={projectDetails.title}
                  placeholder="Title"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={projectDetails.language}
                  placeholder="Language"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      language: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={projectDetails.github}
                  placeholder="Github"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      github: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={projectDetails.website}
                  placeholder="Website"
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      website: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={projectDetails.overview}
                  placeholder="Overview"
                  rows={4}
                  className="form-control"
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      overview: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default AddProject;
