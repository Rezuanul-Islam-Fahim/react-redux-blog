import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { selectLoggedUserId } from '@/features/auth'
import { client } from '@/api/client'

const usersAdapter = createEntityAdapter()

const initialUsers = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export const usersReducer = usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors(state => state.users)

export const selectUser = state => {
  const userId = selectLoggedUserId(state)

  if (!userId) {
    return;
  }

  return selectUserById(state, userId)
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await client.get('/fakeApi/users')
  return users.data
})
