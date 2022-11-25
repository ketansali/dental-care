import React, { useEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
import Stepper from "./Stepper";
import { useStepper } from "./context";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../Css/patient.css";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./Toaster";
import { addPatients, getPatients } from "./OrderStore/StoreAction";
import { useNavigate } from "react-router-dom";

const PatientFile = [{ label: "Old" }, { label: "New" }];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  minWidth: 700,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PatientManagment = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { incrementCurrentStep, decrementCurrentStep } = useStepper();
  const [flag, setFlag] = useState(false);

  const patients = useSelector((state)=>state.patients)

  const func2 = () => {
    setFlag(true);
  };

  const columns = [
    {
      field: "reference",
      headerName: "Ref",
      width: 380,
    },
    {
      field: "name",
      headerName: "Patient",
      width: 380,
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 380,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 380,
      renderCell: (params) => {    
        return (
          <div>
            {params.row.isActive ? <Button className="activeBtn">Active</Button>:<Button className="deactiveBtn">NotActive</Button>}
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      Ref: "510f59d5",
      Patient: "Alex Parker",
      Created: "2 Jan 2021",
      Status: "",
    },
    {
      id: 2,
      Ref: "510f59d5",
      Patient: "Tonny Star",
      Created: "23 Nov 2020",
      Status: "",
    },
    {
      id: 3,
      Ref: "510f59d5",
      Patient: "Deny Umred",
      Created: "2 Jan 2021",
      Status: "",
    },
    {
      id: 4,
      Ref: "510f59d5",
      Patient: "Jane Doe",
      Created: "2 Jan 2021",
      Status: "",
    },
    {
      id: 5,
      Ref: "510f59d5",
      Patient: "Tonny Star",
      Created: "23 Nov 2020",
      Status: "",
    },
  ];

  const dentalImageSection = [
    {
      teethImage: "assets/images/f1.png",
      profile: "Right Profile",
      file: "Upload",
    },
    {
      teethImage: "assets/images/f2.png",
      profile: "Frontal Repose",
      file: "Upload",
    },
    {
      teethImage: "assets/images/f3.png",
      profile: "Frontal smile",
      file: "Upload",
    },
    {
      teethImage: "assets/images/f4.png",
      profile: "Panoramic xray",
      file: "Upload",
    },
  ];

  const [patientType, setPatientType] = useState("");
  const [orthodontist, setOrthodontist] = useState("");
  const [invisalingType, setInvisalingType] = useState("");
  const [images, setImages] = useState("");
  const [reference, setReference] = useState("");
  const [intraoral, setIntraoral] = useState("");
  const [treatment, setTreatment] = useState("");
  const [name, setName] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("patientType", patientType);
    form.append("orthodontist", orthodontist);
    form.append("invisalingType", invisalingType);
    form.append("reference", reference);
    form.append("treatment", treatment);
    form.append("name", name);
    for (let pic of images) {
      form.append("images", pic);
    }
    if (
      patientType !== "" &&
      orthodontist !== "" &&
      invisalingType !== "" &&
      intraoral !== "" &&
      treatment !== "" &&
      name !== ""
    ) {
      dispatch(addPatients(form)).then(() => {
        setName("");
        setReference("");
        setPatientType("");
        setOrthodontist("");
        setInvisalingType("");
        setImages("");
        setIntraoral("");
        setTreatment("");
        setOpen(false);
      });
    } else {
      Toast({ msg: "Some filed are required", type: "error" });
    }
  };
  const handleSetImage = (e) => {
    
    // encodeFilebase64(e.target.files[0])
    setImages([...images,e.target.files[0]]);

  };
  const encodeFilebase64 = (file)=>{
    let render = new FileReader();
    if(file){
        render.readAsDataURL(file)
        render.onload = ()=>{
            let base64 = render.result
            setImages([...images ,base64])
        }
        render.onerror = (error)=>{
            console.log('error',error)
        }
    }
  }
  useEffect(()=>{
    dispatch(getPatients())
  },[])
  return (
    <>
      <SideBar>
        <Header src="assets/images/patient1.png" name="Patient Management" />
        <div className="main-content">
          <div className="patient-section">
            {flag ? (
              <div>
                <div className="patientList">
                  <p>List of all Patient</p>
                  <Button
                    variant="contained"
                    size="large"
                    className="newPatientBtn"
                    onClick={handleOpen}
                  >
                    <AddIcon /> New Patient
                  </Button>
                </div>
                <div
                  style={{ height: 400, width: "100%" }}
                  className="patientTable"
                >
                  {patients?.data?.data ?
                    <DataGrid
                    rows={patients?.data?.data}
                    columns={columns} 
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    getRowId={(row) => row._id}
                  />:""}
                </div>
              </div>
            ) : (
              <Stepper>
                <Stepper.Steps>
                  <Stepper.Step id="first" name="Create Patient">
                    <StepBody>
                      <div>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} md={5} lg={5}>
                              <div className="patientDetails">
                                <p>Patient Details</p>
                              </div>
                              <Autocomplete
                                disablePortal
                                options={PatientFile}
                                className="formInput"
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Patient Choice"
                                  />
                                )}
                                value={patientType}
                                onChange={(e, v) => setPatientType(v.label)}
                              />
                            </Grid>
                            <Grid item md={2} lg={2} className="lineImage">
                              <img src="assets/images/Line.png" />
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                              <div className="patientDetails">
                                <p>Invisaling Details</p>
                              </div>
                              <Grid
                                item
                                xs={12}
                                lg={12}
                                sx={{ paddingBottom: "50px" }}
                              >
                                <Autocomplete
                                  disablePortal
                                  options={PatientFile}
                                  className="formInput"
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Orthodontist"
                                    />
                                  )}
                                  value={orthodontist}
                                  onChange={(e, v) => setOrthodontist(v.label)}
                                />
                              </Grid>
                              <Grid item xs={12} lg={12}>
                                <Autocomplete
                                  disablePortal
                                  options={PatientFile}
                                  className="formInput"
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Type of invisalign Provider"
                                    />
                                  )}
                                  value={invisalingType}
                                  onChange={(e, v) =>
                                    setInvisalingType(v.label)
                                  }
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                      <div className="continueBtn">
                        <Button
                          variant="contained"
                          size="large"
                          className="cancel"
                          onClick={decrementCurrentStep}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          className="nextStep"
                          onClick={incrementCurrentStep}
                        >
                          Continue
                        </Button>
                      </div>
                    </StepBody>
                  </Stepper.Step>
                  <Stepper.Step id="second" name="Upload Photos">
                    <StepBody>
                      <div>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container>
                            <Grid item xs={12} md={5} lg={5}>
                              <div className="patientDetails">
                                <p>Upload Patient Files</p>
                              </div>
                              <Grid container spacing={2}>
                                {dentalImageSection.map((e, index) => {
                                  return (
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                      lg={6}
                                      key={index}
                                    >
                                      <div className="uploadImage">
                                        <img src={e.teethImage} />
                                        <p>{e.profile}</p>
                                        <label className="custom-file-upload">
                                          <input type="file" accept="image/*" onChange={handleSetImage} />
                                         
                                          {e.file}
                                        </label>
                                      </div>
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            </Grid>
                            <Grid item lg={2} md={2} className="lineImage">
                              <img src="assets/images/Line.png" />
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                              <div className="patientDetails">
                                <p>Please select an intraoral option:</p>
                              </div>
                              <Grid
                                item
                                xs={12}
                                lg={12}
                                sx={{ paddingBottom: "50px" }}
                              >
                                <Autocomplete
                                  disablePortal
                                  options={PatientFile}
                                  className="formInput"
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Intraoral Option"
                                    />
                                  )}
                                  value={intraoral}
                                  onChange={(e, v) => setIntraoral(v.label)}
                                />
                              </Grid>
                              <Grid item xs={12} lg={12}>
                                <Autocomplete
                                  disablePortal
                                  options={PatientFile}
                                  className="formInput"
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Treatment Objective"
                                    />
                                  )}
                                  value={treatment}
                                  onChange={(e, v) => setTreatment(v.label)}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                      <div className="continueBtn">
                        <Button
                          variant="contained"
                          size="large"
                          className="cancel"
                          onClick={decrementCurrentStep}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          className="nextStep"
                          onClick={() => {
                            incrementCurrentStep();
                            func2();
                          }}
                        >
                          Continue
                        </Button>
                      </div>
                    </StepBody>
                  </Stepper.Step>
                  <Stepper.Step id="third" name="Order">
                    <StepBody>
                      <div className="continueBtn">
                        <Button
                          variant="contained"
                          size="large"
                          className="cancel"
                          onClick={decrementCurrentStep}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          size="large"
                          className="nextStep"
                          onClick={incrementCurrentStep}
                        >
                          Continue
                        </Button>
                      </div>
                    </StepBody>
                  </Stepper.Step>
                </Stepper.Steps>
              </Stepper>
            )}
          </div>
        </div>
      </SideBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Patient
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form
              className="main-form"
              onSubmit={handleSumbit}
              encType="multipart/form-data"
            >
              <div className="textField modalTextField">
                <TextField
                  label="Name"
                  id="fullWidth"
                  type="text"
                  className="formInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* <div className='textField'>
                                <TextField id="fullWidth" type='date' className='formInput' />
                            </div> */}
              <div className="textField modalTextField">
                <TextField
                  label="Reference (optional)"
                  id="fullWidth"
                  type="text"
                  className="formInput"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              <Button
                variant="contained"
                size="large"
                className="submitButton"
                type="submit"
                //onClick={handleClose}
              >
                Submit
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

const StepBody = styled.div`
  text-align: center;
`;

export default PatientManagment;
