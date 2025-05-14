import { configureStore } from "@reduxjs/toolkit"
import exampleReducer from "./exampleReducer"
import themeReducer from "./themeReducer"

const store = configureStore({
  reducer: {
    example: exampleReducer,
    theme: themeReducer,
  },
})

export default store
