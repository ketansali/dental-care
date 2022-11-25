import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { Select } from "@mui/material";
import Toast from "./Toaster";
import { addAddres } from "./OrderStore/StoreAction";

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

const AddNewAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clinicName, setClinicName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [GSTNumber, setGSTNumber] = useState("");
  const [instraction, setInstraction] = useState("");

  const [errclinicName, setErrClinicName] = useState(false);
  const [errtype, setErrType] = useState(false);
  const [erraddress1, setErrAddress1] = useState(false);
  const [erraddress2, setErrAddress2] = useState(false);
  const [errcity, setErrCity] = useState(false);
  const [errstate, setErrState] = useState(false);
  const [errcountry, setErrCountry] = useState(false);
  const [errcontact, setErrContact] = useState(false);
  const [errzipcode, setErrZipcode] = useState(false);
  const [errGSTNumber, setErrGSTNumber] = useState(false);
  const [errinstraction, setErrInstraction] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (clinicName === "") setErrClinicName(true);
    if (address1 === "") setErrAddress1(true);
    if (city === "") setErrCity(true);
    if (state === "") setErrState(true);
    if (country === "") setErrCountry(true);
    if (zipcode === "") setErrZipcode(true);
    if (GSTNumber === "") setErrGSTNumber(true);
    const address = {
      clinicName,
      address1,
      address2,
      city,
      state,
      country,
      zipcode,
      GSTNumber,
      instraction,
      type: "Billing",
      contact,
    };
    if (
      clinicName !== "" &&
      address1 !== "" &&
      city !== "" &&
      state !== "" &&
      country !== "" &&
      zipcode !== "" &&
      GSTNumber !== ""
    ) {
      
      dispatch(addAddres(address)).then(() => {
        navigate("/welcome");
      });
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="appBar">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <img src="assets/images/Polygon.png" />
            </IconButton>
            <Typography className="homeLogo">
              <img src="assets/images/home.png" />
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
              className="headerTitle"
            >
              Add New Address
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsNoneOutlinedIcon />
                </Badge>
              </IconButton>
              <IconButton className="pofileImage">
                <img src="assets/images/profileheader.png" />
              </IconButton>
              <IconButton className="pofileImage">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <ArrowDropDownIcon />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <NavLink to="/" className="linkItem">
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </NavLink>
                </Menu>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="main-content">
        <div className="clinic-name">
          <p>Clinic Name</p>
        </div>
        <div>
          <form className="address-form" onSubmit={handleSubmit}>
            <TextField
              id="fullWidth"
              label="ClinicName"
              className="cName"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              onKeyUp={() => setErrClinicName(false)}
              error={errclinicName}
              helperText={errclinicName ? "ClinicName is required" : ""}
            />
            <div className="clinic-name">
              <p>Billing Address</p>
            </div>
            <Grid container spacing={3} sx={{ padding: "50px" }}>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Address 1"
                  id="fullWidth"
                  type="text"
                  name="address1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="formInput"
                  onKeyUp={() => setErrAddress1(false)}
                  error={erraddress1}
                  helperText={erraddress1 ? "Address1 is required" : ""}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Address 2"
                  id="fullWidth"
                  type="text"
                  name="address2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="formInput"
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Contect Number (Optional)"
                  id="fullWidth"
                  type="number"
                  name="phoneNumber"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="formInput"
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Autocomplete
                  disablePortal
                  options={City}
                  className="formInput"
                  name="city"
                  value={city}
                  onChange={(e, value) => setCity(value.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                  // onKeyUp={() => setErrCity(false)}
                  // error={errcity}
                  // helperText={errcity ? "City is required" : ""}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <Autocomplete
                  disablePortal
                  options={State}
                  className="formInput"
                  id="demo-simple-select-error"
                  name="state"
                  value={state}
                  onChange={(event, value) => setState(value.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="State" />
                  )}
                  // onKeyUp={() => setErrState(false)}
                  // error={errstate}
                  // helperText={errstate ? "State is required" : ""}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
              <TextField
                  label="Postal code / Zip code"
                  id="fullWidth"
                  type="number"
                  name="zipCode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="formInput"
                  onKeyUp={() => setErrZipcode(false)}
                  error={errzipcode}
                  helperText={errzipcode ? "Postal code / Zip code is required" : ""}
                />
                
              </Grid>
              <Grid item xs={12} lg={4}>
                <Autocomplete
                  disablePortal
                  options={Country}
                  className="formInput"
                  name="country"
                  value={country}
                  onChange={(event, value) => setCountry(value.label)}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                  // onKeyUp={() => setErrCountry(false)}
                  // error={errcountry}
                  // helperText={errcountry ? "Country is required" : ""}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="TAX ID / GST Number / Vat"
                  id="fullWidth"
                  type="number"
                  name="gst"
                  value={GSTNumber}
                  onChange={(e) => setGSTNumber(e.target.value)}
                  className="formInput"
                  onKeyUp={() => setErrGSTNumber(false)}
                  error={errGSTNumber}
                  helperText={errGSTNumber ? "GSTNumber is required" : ""}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  label="Delivery instruction (Optional)"
                  id="fullWidth"
                  type="text"
                  name="instruction"
                  value={instraction}
                  onChange={(e) => setInstraction(e.target.value)}
                  className="formInput"
                />
              </Grid>
              {/* <Grid item xs={12} lg={4}>
                                <TextField label="Delivery instruction (Optional)" id="fullWidth" type='text' name='instruction' value={dataObj.instruction} onChange={handleChange} className='formInput' />
                            </Grid> */}
            </Grid>
            <div className="subBtn">
              <Button variant="contained" size="large" className="cancel" onClick={()=>navigate('/welcome')}>
                Cancel
              </Button>
              {/* <NavLink to='/welcome' className='linkItem'> */}
              <Button
                variant="contained"
                size="large"
                type="submit"
                className="save-address"
              >
                Save Address
              </Button>
              {/* </NavLink> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewAddress;
