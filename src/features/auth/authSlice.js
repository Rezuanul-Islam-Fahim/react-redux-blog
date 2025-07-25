import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.username = action.payload
    },
    userLoggedOut: state => {
      state.username = null
    },
  },
})

export const authReducer = authSlice.reducer
export const { userLoggedIn, userLoggedOut } = authSlice.actions
