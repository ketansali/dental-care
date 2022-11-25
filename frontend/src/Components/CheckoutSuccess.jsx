import styled from "styled-components";
import {Link} from 'react-router-dom'
const CheckoutSuccess = () => {
    return (
      <Container>
        <h2>Checkout Successful</h2>
        <p>Your order might take some time to process.</p>
        <p>Check your order status at your profile after about 10mins.</p>
        <p>
          Incase of any inqueries contact the support at{" "}
          <strong>vision@onlineshop.com</strong>
        </p>
        <Link to="/shop">Shop</Link>
      </Container>
    );
  };
  
  export default CheckoutSuccess;
  
  const Container = styled.div`
    min-height: 80vh;
    max-width: 800px;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  
    h2 {
      margin-bottom: 0.5rem;
      color: #029e02;
    }
  `;