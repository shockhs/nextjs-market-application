import { REMOVE_TOKEN, SET_BALANCE, SET_USER, UPDATE_BALANCE } from '../actions/auth';

const initialState = {
    authToken: null,
    isAuthenticated: false,
    user: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { authToken: action.data.token, isAuthenticated: true, user: action.data.user };
        case SET_BALANCE: {
            const data = action.balance
            return { ...state, user: { ...state.user, balance: parseInt(data) } };
        }
        case UPDATE_BALANCE: {
            const data = action.balance
            return { ...state, user: { ...state.user, balance: state.user.balance + parseInt(data) } }
        }
        case 'persist/REHYDRATE': {
            const data = action.payload;
            if (data) {
                return {
                    ...state,
                    ...data.auth
                }
            }
        }
        case REMOVE_TOKEN:
            return { ...initialState };
        default:
            return { ...state };
    }
};

export default authReducer;