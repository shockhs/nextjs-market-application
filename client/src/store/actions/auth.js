export const SET_USER = "SET_USER";
export const SET_BALANCE = "SET_BALANCE";
export const REMOVE_TOKEN = "REMOVE_TOKEN";
export const UPDATE_BALANCE = "UPDATE_BALANCE";


//Action Creator
export const setUser = (token, user) => ({
    type: SET_USER,
    data: { token, user }
});
export const setBalance = (balance) => ({
    type: SET_BALANCE,
    balance
});
export const updateBalance = (balance) => ({
    type: UPDATE_BALANCE,
    balance
});

export const removeToken = () => ({
    type: REMOVE_TOKEN
});
