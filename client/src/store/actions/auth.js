export const SET_TOKEN = "SET_TOKEN";
export const REMOVE_TOKEN = "REMOVE_TOKEN";


//Action Creator
export const setToken = (token) => ({
    type: SET_TOKEN,
    token
});

export const removeToken = () => ({
    type: REMOVE_TOKEN
});
