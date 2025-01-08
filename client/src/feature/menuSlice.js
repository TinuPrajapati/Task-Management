import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'Loader',
  initialState: {
    menuState:false
  },
  reducers: {
    changeSlider:(state,action)=>{
      state.menuState=action.payload
    }
  }
})

export const { changeSlider } = menuSlice.actions

export default menuSlice.reducer