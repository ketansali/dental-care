import React, { useState, useEffect } from "react";
import "../Css/order.css";
import "../Css/cart.css";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Checkbox, ClickAwayListener, Drawer, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import SideBar from "./SideBar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  AddOrder,
  addTocart,
  getItemTocart,
  GetOrder,
  removeTocart,
} from "./OrderStore/StoreAction";
import { generatePublicUrl } from "../config/urlConfig";
import PayButton from "./PayButton";

const labels = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const imageView = [
  { img: "assets/images/t4.png" },
  { img: "assets/images/OT1.png" },
  { img: "assets/images/OT2.png" },
  { img: "assets/images/OT3.png" },
];

const MyOrder = () => {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const paymenthandleClose = () => setPaymentOpen(false);
  const paymenthandleOpen = () => {
    setOpen(false);
    setPaymentOpen(true);
  };
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const [success, setSuccess] = useState(false);
  const successhandleClose = () => setSuccess(false);
  const successhandleOpen = () => {
    setOpen(false);
    setPaymentOpen(false);
    setSuccess(true);
  };

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (target, e) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleIncreaseProduct = (productId, quantity) => {
    const item = {
      productId,
      quantity: quantity + 1,
    };
    dispatch(addTocart(item)).then(() => {
      dispatch(getItemTocart());
    });
  };
  const handleDecreaseProduct = (productId, quantity) => {
    if (quantity === 1)
      dispatch(removeTocart(productId)).then(() => dispatch(getItemTocart()));
    const item = {
      productId,
      quantity: quantity - 1,
    };
    if (quantity > 1) {
      dispatch(addTocart(item)).then(() => {
        dispatch(getItemTocart());
      });
    }
  };
  useEffect(() => {
    dispatch(getItemTocart());
  }, []);
  const handleRemove = (productId) => {
    dispatch(removeTocart(productId)).then(() => {
      dispatch(getItemTocart());
    });
  };
  const handleInputFocus = () => {};

  const handlOrder=  ()=>{
    setOpen(true)
    const items =  cart?.data?.data?.cartItems.map((item)=>{
      return {
        productId :item?.productId?._id,
        quantity : item?.quantity,
        total : item?.total
      }
    })
    let order = {
      totalAmount :  cart?.data?.data?.grandTotal,
      paymentStatus: "pending",
      items : JSON.stringify(items),
      cartId : cart?.data?.data?._id
    }
  
   dispatch(AddOrder(order)).then(()=>{
    dispatch(GetOrder())
     dispatch(getItemTocart())
   })
  }
  return (
    <>
      <SideBar>
        <Header src="assets/images/order1.png" name="Product Details" />
        <div className="main-content">
          <div className="order-section">
            <div className="orderTitle">
              <p>RDS UPPER</p>
              <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "#BAE6FF" }}
                      fontSize="inherit"
                    />
                  }
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
            </div>
            <div>
              <Grid container spacing={3} sx={{ paddingTop: "40px" }}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className="cart-body">
                    <div class="CartContainer">
                      <div class="Header">
                        {/* <h3 class="Heading">Shopping Cart</h3> */}
                      </div>
                      {cart?.data?.data?.cartItems.map((item) => (
                        <div class="Cart-Items">
                          <div class="image-box">
                            <img
                              src={generatePublicUrl(
                                `/uploads/Products/${item?.productId?.image}`
                              )}
                              style={{ height: "" }}
                            />
                            <h5 class="title">{item?.productId.title}</h5>
                          </div>
                          {/* <div class="about">
                    <h5 class="title">{item?.productId.title}</h5>
                  </div> */}
                          <div class="counter">
                            <button
                              class="btn"
                              onClick={() =>
                                handleIncreaseProduct(
                                  item?.productId?._id,
                                  item?.quantity
                                )
                              }
                            >
                              +
                            </button>
                            <div class="count">{item?.quantity}</div>
                            <button
                              class="btn"
                              onClick={() =>
                                handleDecreaseProduct(
                                  item?.productId?._id,
                                  item?.quantity
                                )
                              }
                            >
                              -
                            </button>
                          </div>
                          <div class="prices">
                            <div class="amount">${item?.total}</div>
                            <div class="remove">
                              <u
                                onClick={() =>
                                  handleRemove(item?.productId?._id)
                                }
                              >
                                Remove
                              </u>
                            </div>
                          </div>
                        </div>
                      ))}

                      <hr />
                      <div class="checkout">
                        <div class="total">
                          <div>
                            <div class="Subtotal">Sub-Total</div>
                            <div class="items">
                              {cart?.data?.data?.cartItems.length} items
                            </div>
                          </div>
                          <div class="total-amount">
                            ${cart?.data?.data?.grandTotal}
                          </div>
                        </div>
                        <Button variant="contained" size="large"  onClick={()=>setOpen(true)}><ShoppingCartIcon />Order</Button>
                        {/* <button class="button">Checkout</button> */}
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className="imagePart">
                    <Grid container spacing={3}>
                      {imageView.map((e, index) => {
                        return (
                          <Grid item xs={6} lg={6} key={index}>
                            <div className="imageView">
                              <img src={e.img} alt="order" />
                            </div>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <div className="seeMoreBtn">
                      <Button
                        variant="contained"
                        size="large"
                        className="seeMore"
                      >
                        See More
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </SideBar>
      {open && (
        <Drawer
          anchor={"right"}
          open={open}
          onClose={handleClose}
          className="modalDrawer"
        >
          <div className="cartModal">
            <div className="cartItemTitle">
              <p>Your Order</p>
              <span>You have currently {order?.data?.data?.items.length} item in your order list</span>
            </div>
            <div className="selectItem">
              
              {cart?.data?.data?.cartItems.map((item) => (
                     <>
                     <Grid container spacing={2}>
                <Grid item className="dentalImage">
                  <div>
                    <img alt="complex" src={generatePublicUrl(
                                `/uploads/Products/${item?.productId?.image}`
                              )} />
                  </div>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <div className="upperDental">
                        <div>
                          <div className="upperName">{item?.productId?.title}</div>
                          <div className="dentalPrice">${item?.productId?.price}</div>
                          <div className="uppperTitle">${item?.productId?.title}</div>
                        </div>
                        <div className="qyt">
                          <span>QTY: {item?.quantity}</span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <div className="totalPrice">
                      Total : <span>${item?.total}</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <hr />
                     </>   
                      ))}
              {/* <Grid container spacing={2} className="cartPart">
                <Grid item>
                  <div className="dentalImage">
                    <img alt="complex" src="assets/images/49.png" />
                  </div>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <div className="upperDental">
                        <div>
                          <div className="upperName">UPPER DENTAL</div>
                          <div className="dentalPrice">$450.00</div>
                          <div className="uppperTitle">Upper design</div>
                        </div>
                        <div className="qyt">
                          <span>QTY: 2</span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <div className="totalPrice">
                      Total : <span>$900.00</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid> */}
              {/* <hr />
              <div className="shipping">
                <div className="ship">Shipping</div>
                <div className="shippingCharge">$200.00</div>
              </div> */}
              <div className="shipping">
                <div className="total">Total </div>
                <div className="shippingCharge">${cart?.data?.data?.grandTotal}</div>
              </div>
              <div className="addCartBtn">
                {/* <Button
                  variant="contained"
                  size="large"
                  className="addCart"
                  onClick={paymenthandleOpen}
                >
                  Process to Checkout
                </Button> */}
                <PayButton order={cart}/>
              </div>
            </div>
          </div>
        </Drawer>
      )}
      {paymentOpen && (
        <Drawer
          anchor={"right"}
          open={paymentOpen}
          onClose={paymenthandleClose}
          className="modalDrawer"
        >
          <div className="cartModal">
            <div className="cartItemTitle">
              <p>PAYMENT</p>
            </div>
            <div className="main-payment">
              <div className="cardDetails">
                <div className="credit-debit">
                  <div className="radioBtn">
                    <FormControl sx={{ m: 3 }} variant="standard">
                      <FormControlLabel
                        value="best"
                        control={<Radio />}
                        label="Credit & Debit Cards"
                      />
                      <p>Transication fee may apply</p>
                    </FormControl>
                  </div>
                  <div className="credit-images">
                    <img src="assets/images/visa.png" />
                    <img src="assets/images/ms.png" />
                  </div>
                </div>
                <form>
                  <Grid container spacing={2} sx={{ padding: "20px" }}>
                    <Grid item lg={12}>
                      <label htmlFor="name" className="inputLabel">
                        Cardholder Name
                      </label>
                      <TextField
                        id="fullWidth"
                        type="text"
                        name="name"
                        className="form-control cardInput"
                        placeholder="Name"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <label htmlFor="number" className="inputLabel">
                        Card Number
                      </label>
                      <TextField
                        id="fullWidth"
                        type="number"
                        name="number"
                        className="form-control cardInput"
                        placeholder="Card Number"
                        pattern="[\d| ]{16,22}"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <label htmlFor="name" className="inputLabel">
                        End Date
                      </label>
                      <TextField
                        id="fullWidth"
                        type="tel"
                        name="expiry"
                        className="form-control cardInput"
                        placeholder="Valid Thru"
                        pattern="\d\d/\d\d"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </Grid>
                    <Grid item lg={3}>
                      <label htmlFor="name" className="inputLabel">
                        CVV
                      </label>
                      <TextField
                        id="fullWidth"
                        type="tel"
                        name="cvc"
                        className="form-control cardInput"
                        placeholder="CVC"
                        pattern="\d{3,4}"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </Grid>
                    <Grid item lg={12}>
                      <FormControlLabel
                        control={<Checkbox name="checkBox" />}
                        label="I have read and accept the terms of use, rules of flight and privacy policy"
                      />
                    </Grid>
                  </Grid>
                </form>
              </div>
              <div className="credit-debit onlinePayment">
                <div className="radioBtn">
                  <FormControl sx={{ m: 3 }} variant="standard">
                    <FormControlLabel
                      value="best"
                      control={<Radio />}
                      label="Online banking & Direct debit"
                    />
                    <p>Free to charge</p>
                  </FormControl>
                </div>
                <div className="credit-images">
                  <img src="assets/images/soffort.png" />
                </div>
              </div>
              <div className="credit-debit onlinePayment">
                <div className="radioBtn">
                  <FormControl sx={{ m: 3 }} variant="standard">
                    <FormControlLabel
                      value="best"
                      control={<Radio />}
                      label="Pay with Paypal"
                    />
                    <p>Transication fee may apply</p>
                  </FormControl>
                </div>
                <div className="credit-images">
                  <img src="assets/images/paypal.png" />
                </div>
              </div>
              <div className="addCartBtn">
                <Button
                  variant="contained"
                  size="large"
                  className="payNowBtn"
                  onClick={successhandleOpen}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      )}
      {success && (
        <Drawer
          anchor={"right"}
          open={success}
          onClose={paymenthandleClose}
          className="modalDrawer"
        >
          <div className="cartModal">
            <div className="cartItemTitle">
              <img src="assets/images/success.png" className="successLogo" />
              <p>SAUCCESSFULLY PAID</p>
            </div>
            <div className="successPaid">
              <div className="invoiceSection">
                <div className="idPart">Transaction ID</div>
                <div className="inDetails">TX1568258</div>
              </div>
              <hr />
              <div className="invoiceSection">
                <div className="idPart">Payment Type</div>
                <div className="inDetails">Net banking</div>
              </div>
              <hr />
              <div className="invoiceSection">
                <div className="idPart">Bank</div>
                <div className="inDetails">HDFC</div>
              </div>
              <hr />
              <div className="invoiceSection">
                <div className="idPart">Mobile</div>
                <div className="inDetails">98765 43210</div>
              </div>
              <hr />
              <div className="invoiceSection">
                <div className="idPart">Email</div>
                <div className="inDetails">abc@gmail.com</div>
              </div>
              <hr />
              <div className="invoiceSection">
                <div className="amountPaid">Amount Paid</div>
                <div className="total">$2000.00</div>
              </div>
              <div className="paymentButton">
                <Button variant="contained" size="large" className="nextStep">
                  Invoice
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  className="cancel"
                  onClick={successhandleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default MyOrder;
