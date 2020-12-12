const initialState = {
    email: '',
}

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload.email,
            }
        default:
            return state
    }
}

export default UserReducer
