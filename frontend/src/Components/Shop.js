import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import "../Css/shop.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import Header from "./Header";
import { getAllProducts } from "./OrderStore/StoreAction/index";
import { generatePublicUrl } from "../config/urlConfig";
import { addTocart } from "./OrderStore/StoreAction/AddToCartAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Shop = () => {
  const product = useSelector((state) => state.productItem);
  const blankArr = useSelector((state) => state.cartItem);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const handleAddToCart = (id) => {
    const item = {
      productId: id,
      quantity: 1,
    };
    dispatch(addTocart(item));
  };
  return (
    <>
      <SideBar>
        <Header src="assets/images/shop1.png" name="Shop" />
        <div className="main-content">
          <div className="teeth-section">
            <Grid container spacing={4} sx={{ padding: "20px 0" }}>
              {product.data?.data?.map((e, index) => {
                return (
                  <Grid item xs={12} md={6} lg={3} key={index}>
                    <div className="teeth-type">
                      <div className="teeth-images">
                        <img
                          src={generatePublicUrl(
                            `/uploads/Products/${e.image}`
                          )}
                          alt="shop"
                        />
                      </div>
                      <div className="teeth-name">{e.title}</div>
                      <div className="teeth-text">
                        <p>{e.description}</p>
                        
                      </div>
                      <div className="price-section">
                          <div className="main-price">
                            <p>${e.price}</p>
                          </div>
                        </div>
                      <div className="oBtn">
                        <Button
                          variant="contained"
                          size="large"
                          className="addCart"
                          onClick={() => handleAddToCart(e._id)}
                        >
                          <ShoppingCartIcon /> ADD TO CART
                        </Button>
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default Shop;
