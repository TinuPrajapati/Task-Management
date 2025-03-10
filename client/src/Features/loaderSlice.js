import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: false
  },
  reducers: {
    changeState: (state,action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeState } = loaderSlice.actions

export default loaderSlice.reducer