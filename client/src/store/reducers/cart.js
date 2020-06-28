import { ADD_GOOD, MINUS_COPY, PLUS_COPY, REMOVE_GOOD, RESET } from '../actions/cart';

const initialState = {
    stack: {},
    names: {},
    counter: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOOD:
            return {
                ...state,
                stack: { ...state.stack, [action.id]: 1 },
                names: { ...state.names, [action.id]: action.name },
                counter: state.counter + 1
            };
        case REMOVE_GOOD: {
            const newStack = { ...state.stack }
            const newNames = { ...state.names }
            delete newStack[action.id];
            delete newNames[action.id];
            return { ...state, stack: { ...newStack }, names: { ...newNames }, counter: state.counter - 1 };
        }
        case PLUS_COPY: {
            return { ...state, stack: { ...state.stack, [action.id]: state.stack[action.id] + 1 }, counter: state.counter + 1 }
        }
        case MINUS_COPY: {
            if (state.stack[action.id] - 1 === 0) {
                const newStack = { ...state.stack }
                const newNames = { ...state.names }
                delete newStack[action.id];
                delete newNames[action.id];
                return { ...state, stack: { ...newStack }, names: { ...newNames }, counter: state.counter - 1 };
            }
            return { ...state, stack: { ...state.stack, [action.id]: state.stack[action.id] - 1 }, counter: state.counter - 1 }
        }
        case RESET: {
            return { ...initialState }
        }
        case 'persist/REHYDRATE': {
            const data = action.payload;
            if (data) {
                return {
                    ...state,
                    ...data.cart
                }
            }
        }
        default:
            return { ...state };
    }
};

export default cartReducer;