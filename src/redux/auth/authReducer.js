import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, UPDATE_VISITED } from "./authActions"

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VISITED:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          visited: action.payload,
        },
      };

    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null }

    case LOGIN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload }

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error }

    case LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}

export default authReducer

