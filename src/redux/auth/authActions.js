import { API_URL } from '../../config';

// Action types
  export const LOGIN_REQUEST = "auth/loginRequest"
  export const LOGIN_SUCCESS = "auth/loginSuccess"
  export const LOGIN_FAILURE = "auth/loginFailure"
  export const LOGOUT = "auth/logout"
  export const UPDATE_VISITED = "auth/updateVisited"
  export const UPDATE_SAVED = "auth/updateSaved"

// Login action (async thunk)
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await fetch(`${API_URL}/users?email=${email}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await response.json();
    const user = users.find(u => u.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({ type: LOGIN_FAILURE, error: "Invalid credentials" });
    }

  } catch (error) {
    console.error("Login error:", error);
    dispatch({ type: LOGIN_FAILURE, error: "Server error" });
  }
};

// Logout action
export const logoutUser = () => {
  localStorage.removeItem('user');
  return { type: LOGOUT };
};

// Update visited list
export const updateUserVisited = (visited) => ({
  type: UPDATE_VISITED,
  payload: visited
});

// Update saved list
export const updateUserSaved = (saved) => ({
  type: UPDATE_SAVED,
  payload: saved
});
