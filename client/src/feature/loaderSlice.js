import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
  name: 'Loader',
  initialState: {
    loaderState:false
  },
  reducers: {
    changeState:(state,action)=>{
      state.loaderState=action.payload
    }
  }
})

export const { changeState } = loaderSlice.actions

export default loaderSlice.reducer