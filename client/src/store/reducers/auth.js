import { REMOVE_TOKEN, SET_TOKEN } from '../actions/auth';

const initialState = {
    authToken: null,
    isAuthenticated: false
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return { authToken: action.token, isAuthenticated: true };
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
            return { authToken: null, isAuthenticated: false };
        default:
            return { ...state };
    }
};

export default authReducer;