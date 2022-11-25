import React, { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "./OrderStore/StoreAction";
import Toast from '../Components/Toaster/index'
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [errfirstName, setErrFirstName] = useState(false);
  const [errlastName, setErrLastName] = useState(false);
  const [erremail, setErrEmail] = useState(false);
  const [errjobtitle, setErrJobTitle] = useState(false);
  const [errpassword, setErrPassword] = useState(false);
  const [errcpassword, setErrCPassword] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault()
    const user ={
        firstName,
        lastName,
        email,
        jobtitle,
        password
    }
    if (firstName === "") setErrFirstName(true);
    if (lastName === "") setErrLastName(true);
    if (email === "") setErrEmail(true);
    if (password === "") setErrPassword(true);
    if (cpassword === "") setErrCPassword(true);
    if (jobtitle === "") setErrJobTitle(true);
    if(password !== cpassword) {
      Toast({msg:"Password does not match",type:'error'})
      return false
    }
    if(firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    password !== "" &&
    cpassword !== "" && jobtitle !== "" && cpassword === password){

      dispatch(signup(user)).then(()=>{
        navigate('/')
      })
    }else{
      Toast({msg:"All field required",type:"error"})
    }
  }
  return (
    <div className="main-section">
    
      <Grid container sx={{ height: "100vh" }}>
        <Grid item xs={12} lg={6} sx={{ height: "100vh" }}>
          <div className="signinsection-1">
            <div className="signinHeader">
              <img src="/assets/images/dentalcare.png" />
            </div>
            <div className="signinMainImage">
              <img src="/assets/images/signinimage.png" />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={6} sx={{ height: "100vh" }}>
          <div className="signinsection-2">
            <div className="formHeader">
              <img src="/assets/images/formheader.png" />
            </div>
            <div className="signinForm">
              <form className="signUp-form" onSubmit={handleSubmit}>
                <Grid container spacing={3} sx={{ padding: "0 30px" }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                    error={errfirstName}
                      label="First Name"
                      id="outlined-error-helper-text"
                      value={firstName}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="formInput"
                      onKeyUp={()=>setErrFirstName(false)}
                      helperText={errfirstName?"FirstName is required":""}
                    />
                    
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                    error={errlastName}
                      label="Last Name"
                      id="fullWidth"
                      value={lastName}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      className="formInput"
                      onKeyUp={()=>setErrLastName(false)}
                      helperText={errlastName?"LastName is required":""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                    error={errjobtitle}
                      label="Job Title"
                      id="fullWidth"
                      value={jobtitle}
                      type="text"
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="formInput"
                      onKeyUp={()=>setErrJobTitle(false)}
                      helperText={errjobtitle?"JobTitle is required":""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                    error={erremail}
                      label="E-mail"
                      id="fullWidth"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="formInput"
                      onKeyUp={()=>setErrEmail(false)}
                      helperText={erremail?"Email is required":""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                    error={errpassword}
                      label="Password"
                      id="fullWidth"
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="formInput"
                      onKeyUp={()=>setErrPassword(false)}
                      helperText={errpassword?"Password is required":""}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                    error={errcpassword}
                      label="Confirm Password"
                      id="fullWidth"
                      value={cpassword}
                      type="password"
                      onChange={(e) => setCPassword(e.target.value)}
                      className="formInput"
                      onKeyUp={()=>setErrCPassword(false)}
                      helperText={errcpassword?"Confirm Password is required":""}
                    />
                  </Grid>
                </Grid>

                  <Button
                    variant="contained"
                    size="large"
                    className="signin-button"
                    type="submit"
                  >
                    SIGN UP
                  </Button>
             
              </form>
            </div>
            <div className="signin-account">
              <p>
                Already have an Account?{" "}
                <NavLink to="/" className="linkItem">
                  Sign In
                </NavLink>
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignUp;
