
import { Button } from "@mui/material";
import axiosIntance from "../helpers/axios";

const PayButton = ({ order }) => {
  console.log({order});
  const handleCheckout = () => {
    axiosIntance
      .post(`/stripe/create-checkout-session`,{
        _id :order.data.data._id,
        userId:order.data.data.userId,
        totalAmount:order.data.data.totalAmount,
        cartItems : JSON.stringify(order.data.data.cartItems)
      })
      .then((response) => {  
        debugger
        if (response.data.session) {
          const items =  order?.data?.data?.cartItems.map((item)=>{
            return {
              productId :item?.productId?._id,
              quantity : item?.quantity,
              total : item?.total
            }
          })
          let orderData = {
            totalAmount :  order?.data?.data?.grandTotal,
            paymentStatus: "completed",
            items : JSON.stringify(items),
            cartId : order?.data?.data?._id
          }
          
       axiosIntance.post("/order/add", orderData);
          window.location.href = response.data.session.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      {/* <button onClick={() => handleCheckout()}>Check out</button> */}
      <Button
                  variant="contained"
                  size="large"
                  className="addCart"
                  onClick={() => handleCheckout()}
                >
                  Process to Checkout
                </Button>
    </>
  );
};

export default PayButton;
