import { configureStore } from '@reduxjs/toolkit'
import loaderReducer from '../feature/loaderSlice'
import menuSlice from '../feature/menuSlice'

export default configureStore({
  reducer: {
    loader: loaderReducer,
    menu:menuSlice
  }
})