import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.userId = action.payload
    },
    userLoggedOut: state => {
      state.userId = null
    },
  },
})

export const authReducer = authSlice.reducer
export const { userLoggedIn, userLoggedOut } = authSlice.actions

export const selectLoggedUserId = state => state.auth.userId
