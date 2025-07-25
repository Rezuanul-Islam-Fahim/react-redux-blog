import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
})

export const authReducer = authSlice.reducer
