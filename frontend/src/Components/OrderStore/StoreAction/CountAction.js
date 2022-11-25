import { DECREMENT, INCREMENT } from "../StoreTypes/StoreTypes";

export const increment = () => {
    return {
        type: INCREMENT,
    };
};

export const decrement = () => {
    return {
        type: DECREMENT,
    };
};
