import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    value: null,
    online:[]
  },
  reducers: {
    changeUser: (state,action) => {
      state.value = action.payload
    },
    changeOnline: (state,action) => {
      state.online = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeUser,changeOnline } = userSlice.actions

export default userSlice.reducer