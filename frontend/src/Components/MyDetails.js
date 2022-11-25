import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { useJwt } from "react-jwt";
import { useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { GetAddress } from "./OrderStore/StoreAction";
import TextareaAutosize from "@mui/material/TextareaAutosize";
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
const type = [{ label: "Billing" ,value:"Billing" }, { label: "Shipping",value:"Shipping" }];
const City = [
  { label: "Surat" },
  { label: "Junagadh" },
  { label: "Rajkot" },
  { label: "Bhavanagar" },
  { label: "Jamanagar" },
];

const State = [
  { label: "Gujarat" },
  { label: "Maharastra" },
  { label: "Madhay Pradesh" },
  { label: "Punjab" },
  { label: "Delhi" },
  { label: "Assam" },
  { label: "Rajasthan" },
];

const Country = [
  { label: "India" },
  { label: "Pakistan" },
  { label: "South Africa" },
  { label: "Germany" },
  { label: "Canada" },
  { label: "West Indies" },
  { label: "Africa" },
  { label: "USA" },
  { label: "UK" },
  { label: "Russia" },
  { label: "Ukrain" },
];

const MyDetails = () => {
  const [open, setOpen] = useState(false);
  const [shipAddress, setShipAddress] = useState([]);
  const [billAddress, setBillAddress] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { decodedToken } = useJwt(localStorage.getItem("token"));
  const [dataObj, setDataObj] = useState({ fname: "", lname: "", email: "" });
  const [addressObj, setAddressObj] = useState({
    type: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    contact: "",
    zipcode: "",
  });
  const dispatch = useDispatch();
  const address = useSelector((state) => state.address);
  const handleChange = (e, index) => {
    let change = [...dataObj];
    change[index][e.target.name] = e.target.value;
    setDataObj(change);
  };
  useEffect(() => {
    setDataObj({
      fname: decodedToken?.userData?.firstName,
      lname: decodedToken?.userData?.lastName,
      email: decodedToken?.userData?.email,
    });
    dispatch(GetAddress());
  }, [decodedToken]);
  // const addFormFields = () => {
  //     setDataObj([...dataObj, { billingAdd: '' },]);
  // }
  const formSubmit = (e) => {
    e.preventDefault();
  };
//    address?.data?.data?.filter((add)=>add.type === "Shipping")?.map((item)=>{
    
//    })

  const handleCahnge = (e) => {
    console.log({e});
    setAddressObj((prevState)=>({...prevState ,[e.target.name] : e.target.value}))
  };
  console.log({addressObj});
  return (
    <div>
      <SideBar>
        <Header src="assets/images/details1.png" name="My Details" />
        <div className="main-content">
          <form onSubmit={formSubmit}>
            <Grid container spacing={3} sx={{ padding: "20px" }}>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="First Name"
                  id="fullWidth"
                  name="fname"
                  value={dataObj.fname}
                  onChange={handleChange}
                  type="text"
                  className="formInput"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Last Name"
                  id="fullWidth"
                  name="lname"
                  value={dataObj.lname}
                  onChange={handleChange}
                  type="text"
                  className="formInput"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Email"
                  id="fullWidth"
                  name="email"
                  value={dataObj.email}
                  onChange={handleChange}
                  type="email"
                  className="formInput"
                  disabled={true}
                />
              </Grid>

              {/* <Grid item xs={12} lg={4}>
                                <TextField label="Password" id="fullWidth" name='password' value={dataObj.password} onChange={handleChange} type='password' className='formInput' />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <TextField label="Confirm Password" id="fullWidth" name='confrimpassword' value={dataObj.confirmpassword} onChange={handleChange} type='password' className='formInput' />
                            </Grid> */}
              {/* {dataObj.map((el, index) => {
                                return (
                                    <Grid item xs={12} lg={8} key={index}>
                                        <TextField label="Billing address" id="fullWidth" name='billingAdd' type='text' className='formInput billing-text'
                                            value={el.billingAdd}
                                            onChange={e => handleChange(e, index)}
                                            sx={{ margin: '10px 0' }}
                                        />
                                    </Grid>
                                );
                            })} */}
              {/* <Grid item xs={12} lg={4}>
                                <TextField label="Password" id="fullWidth" name='password' value={dataObj.password} onChange={handleChange} type='password' className='formInput' />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <TextField label="Confirm Password" id="fullWidth" name='confrimpassword' value={dataObj.confirmpassword} onChange={handleChange} type='password' className='formInput' />
                            </Grid> */}
              {/* {dataObj.map((el, index) => {
                                return (
                                    <Grid item xs={12} lg={8} key={index}>
                                        <TextField label="Billing address" id="fullWidth" name='billingAdd' type='text' className='formInput billing-text'
                                            value={el.billingAdd}
                                            onChange={e => handleChange(e, index)}
                                            sx={{ margin: '10px 0' }}
                                        />
                                    </Grid>
                                );
                            })} */}
              <Grid item xs={12} lg={4}>
                <Button size="large" onClick={handleOpen} className="AddField">
                  <AddIcon className="addIcon" /> Add Another Address
                </Button>
              </Grid>
              <Grid item xs={12} lg={8}>
                {/* <TextField label="Shipping address" id="fullWidth" name='shippingAdd' value={dataObj.shippingAdd} onChange={handleChange} type='text' className='formInput billing-text' /> */}
                <Typography id="modal-modal-title" variant="h6" component="h2">Shipping Address</Typography>
                {/* {
                    address?.data?.data
                } */}
                <TextareaAutosize
                  disabled={true}
                  aria-label="Shipping address"
                  minRows={3}
                  className='formInput billing-text'
                />
              </Grid>
            </Grid>
            {/* <div className='updateButton'>
                            <Button variant="contained" size="large" type='submit' className='update-btn'>Update</Button>
                        </div> */}
          </form>
        </div>
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
                //   onSubmit={handleSumbit}
                encType="multipart/form-data"
              >
                <div className="textField modalTextField">
                  <Autocomplete
                    disablePortal
                    options={type}
                    className="formInput"
                    name="type"
                    
                    // value={addressObj.type}
                    onChange={handleCahnge}
                    renderOption={(props, option) => (
                                                <li key={option.label} value={option.label} {...props}>
                                                    {option.label}
                                                </li>
                                            )}
                                     
                    renderInput={(params) => (
                      <TextField {...params} label="Type" />
                    )}
                  />
                </div>
                <div className="textField modalTextField">
                  <TextField
                    label="Address1"
                    id="fullWidth"
                    type="text"
                    name="address1"
                    className="formInput"
                    value={addressObj.address1}
                    onChange={handleCahnge}
                  />
                </div>
                <div className="textField modalTextField">
                  <TextField
                    label="Address2 (optional)"
                    id="fullWidth"
                    type="text"
                    name ="address2"
                    className="formInput"
                    value={addressObj.address2}
                    onChange={handleCahnge}
                  />
                </div>
                <div className="textField modalTextField">
                  <Autocomplete
                    disablePortal
                    options={Country}
                    className="formInput"
                    name="country"
                    value={addressObj.country}
                    onChange={handleCahnge}
                    renderInput={(params) => (
                      <TextField {...params} label="Country" />
                    )}
                  />
                </div>
                <div className="textField modalTextField">
                  <Autocomplete
                    disablePortal
                    options={State}
                    className="formInput"
                    id="demo-simple-select-error"
                    name="state"
                    value={addressObj.state}
                    onChange={handleCahnge}
                    renderInput={(params) => (
                      <TextField {...params} label="State" />
                    )}
                  />
                </div>
                <div className="textField modalTextField">
                  <Autocomplete
                    disablePortal
                    options={City}
                    className="formInput"
                    name="city"
                    value={addressObj.city}
                    onChange={handleCahnge}
                    renderInput={(params) => (
                      <TextField {...params} label="City" />
                    )}
                  />
                </div>
                <div className="textField modalTextField">
                  <TextField
                    label="Contact (optional)"
                    id="fullWidth"
                    type="text"
                    name= "contact"
                    className="formInput"
                    value={addressObj.contact}
                    onChange={handleCahnge}
                  />
                </div>
                <div className="textField modalTextField">
                  <TextField
                    label="ZipCode"
                    id="fullWidth"
                    type="text"
                    name ="zipcode"
                    className="formInput"
                    value={addressObj.zipcode}
                    onChange={handleCahnge}
                  />
                </div>
                <Button
                  variant="contained"
                  size="large"
                  className="submitButton"
                  type="submit"
                  onClick={handleClose}
                >
                  Submit
                </Button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </SideBar>
    </div>
  );
};

export default MyDetails;
