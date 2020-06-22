import { DECREMENT_COUNTER, INCREMENT_COUNTER } from '../actions/cart';

const cartReducer = (state = { value: 0 }, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return { ...state, value: state.value + 1 };
        case DECREMENT_COUNTER:
            return { ...state, value: state.value - 1 };
        default:
            return { ...state };
    }
};

export default cartReducer;