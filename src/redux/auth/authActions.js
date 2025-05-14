// redux/authActions.js

// Action types
export const LOGIN_REQUEST = "auth/loginRequest"
export const LOGIN_SUCCESS = "auth/loginSuccess"
export const LOGIN_FAILURE = "auth/loginFailure"
export const LOGOUT = "auth/logout"

// Thunk action creator per il login
export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST })

    try {
      const response = await fetch("http://localhost:3001/users?email=" + email)
      const users = await response.json()

      const user = users.find(u => u.password === password)

      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user })
      } else {
        dispatch({ type: LOGIN_FAILURE, error: "Invalid credentials" })
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, error: "Server error" })
      console.error("Login error:", error)
    }
  }
}

// Action creator per il logout
export const logoutUser = () => ({
  type: LOGOUT,
})
