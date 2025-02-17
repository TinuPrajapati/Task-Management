import { configureStore } from '@reduxjs/toolkit'
import loaderSlice from '../Features/loaderSlice'
import userSlice from '../Features/userSlice'

export default configureStore({
  reducer: {
    loader:loaderSlice,
    user:userSlice
  }
})