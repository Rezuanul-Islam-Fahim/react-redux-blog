import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '@/api/client'

const initialState = {
  userId: null,
}

export const login = createAsyncThunk('auth/login', async username => {
  await client.post('fakeApi/login', { username })
  return username
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await client.post('fakeApi/logout', {})
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userId = action.payload
      })
      .addCase(logout.fulfilled, state => {
        state.userId = null
      })
  },
})

export const authReducer = authSlice.reducer
export const selectLoggedUserId = state => state.auth.userId
