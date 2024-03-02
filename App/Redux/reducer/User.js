import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    login_status: false
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
      state.login_status = true
    },
    logout(state, action) {
      state.userData = {}
      state.login_status = false
    }
  }
})

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
