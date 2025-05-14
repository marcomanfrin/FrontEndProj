// redux/store.js

import { configureStore } from "@reduxjs/toolkit"
import exampleReducer from "./exampleReducer"
import themeReducer from "./themeReducer"
import authReducer from "./authReducer"

const store = configureStore({
  reducer: {
    example: exampleReducer,
    theme: themeReducer,
    auth: authReducer,
  },
})

export default store
