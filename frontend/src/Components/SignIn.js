import React, { useState } from "react";
import { Grid, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Toast from '../Components/Toaster/index'
import { login } from "./OrderStore/StoreAction";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [erremail, setErrEmail] = useState(false);
  const [errpassword, setErrPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    if (email === "") setErrEmail(true);
    if (password === "") setErrPassword(true);
    if (email !== "" && password !== "") {
      dispatch(login(user)).then(() => {
        navigate("/address");
      });
    } else {
      Toast({ msg: "All field required", type: "error" });
    }
  };

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
            <div className="signin-text">
              <p>
                Log in to get in the moment updates on the things that intret
                you
              </p>
            </div>
            <div className="signinForm">
              <form className="main-form" onSubmit={handleSubmit}>
                <div className="textField">
                  {/* <TextField label="E-mail Address" id="fullWidth" name='email' value={dataObj.email} onChange={handleChange} type='email' className='formInput' /> */}
                  <TextField
                    error={erremail}
                    label="E-mail"
                    id="fullWidth"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="formInput"
                    onKeyUp={() => setErrEmail(false)}
                    helperText={erremail ? "Email is required" : ""}
                  />
                </div>
                <div className="textField">
                  {/* <TextField label="Password" id="fullWidth" name='password' value={dataObj.password} onChange={handleChange} type='password' className='formInput' /> */}
                  <TextField
                    error={errpassword}
                    label="Password"
                    id="fullWidth"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="formInput"
                    onKeyUp={() => setErrPassword(false)}
                    helperText={errpassword ? "Password is required" : ""}
                  />
                </div>
                <div className="textField checkField">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember me"
                    />
                  </FormGroup>
                  <Link underline="none" className="forgot" href="#">
                    Forget Password?
                  </Link>
                </div>
                {/* <NavLink to='/address' className='linkItem'> */}
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  className="signin-button"
                >
                  SIGN IN
                </Button>
                {/* </NavLink> */}
              </form>
            </div>
            <div className="signup-account">
              <p>
                Don’t have an Account?{" "}
                <NavLink to="/signUp" className="linkItem">
                  Sign Up
                </NavLink>
              </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
