import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { selectLoggedUserId } from '@/features/auth'
import { client } from '@/api/client'

const initialUsers = []

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export const usersReducer = usersSlice.reducer

export const fetchAllUsers = state => state.users
export const fetchUserById = (state, id) => state.users.find(e => e.id === id)

export const selectUser = state => {
  const userId = selectLoggedUserId(state)
  return fetchUserById(state, userId)
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await client.get('/fakeApi/users')
  return users.data
})
