

export const initialState = {
    user:''

};

export const UserReducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.payload };
            break;
        default:
            return state;
    }
}