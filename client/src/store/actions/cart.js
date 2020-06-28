export const ADD_GOOD = "ADD_GOOD";
export const REMOVE_GOOD = "REMOVE_GOOD";
export const PLUS_COPY = "PLUS_COPY"
export const MINUS_COPY = "MINUS_COPY"
export const RESET = "RESET"

//Action Creator
export const addToCart = (id, name) => ({
    type: ADD_GOOD,
    id,
    name
});

export const removeFromCart = (id) => ({
    type: REMOVE_GOOD,
    id
});

export const plusCartAction = (id) => ({
    type: PLUS_COPY,
    id
});

export const minusCartAction = (id) => ({
    type: MINUS_COPY,
    id
});
export const resetState = (id) => ({
    type: RESET
});
