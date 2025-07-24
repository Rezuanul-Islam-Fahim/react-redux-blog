import { createSlice } from '@reduxjs/toolkit'

const initialUsers = [
  { id: '0', name: 'John Doe' },
  { id: '1', name: 'Harry Potter' },
  { id: '2', name: 'Donald Trump' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsers,
  reducers: {},
})

export const usersReducer = usersSlice.reducer
