import { DECREMENT, INCREMENT } from "../StoreTypes/StoreTypes";

const initialstate = 0;
export const CountReducer = (state = initialstate, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
};
