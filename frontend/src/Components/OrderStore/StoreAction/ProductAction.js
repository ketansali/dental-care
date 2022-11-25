// import {
//   FETCH_PRODUCTS,
//   FILTER_PRODUCTS_BY_SIZE,
//   ITEM,
// } from "../StoreTypes/StoreTypes";
import {getAllProduct} from '../StoreAction/constants'
import axios from '../../../helpers/axios'
export const getAllProducts = (user) => {
  return async (dispatch) => {
    dispatch({ type: getAllProduct.GETALL_PRODUCT_REQUEST });
    const res = await axios.get("/product/get");
    
    if (res.data.isSuccess) {
      dispatch({ type: getAllProduct.GETALL_PRODUCT_SUCCESS, payload: res.data });
    } else {
      dispatch({ type: getAllProduct.GETALL_PRODUCT_FAILURE, payload: res.data });
    }
  };
};

// export const filterProducts = (products, size) => (dispatch) => {
//   dispatch({
//     type: FILTER_PRODUCTS_BY_SIZE,
//     payload: {
//       size: size,
//       items:
//         size === ""
//           ? products
//           : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
//     },
//   });
// };

// export const orderData = (id) => {
//   return {
//     type: ITEM,
//     payload: id,
//   };
// };
