import { createSlice } from '@reduxjs/toolkit'

const initialPosts = [
  { id: 0, name: 'Post 1', description: 'This is post 1' },
  { id: 1, name: 'Post 2', description: 'This is post 2' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {},
})

export const postsReducer = postsSlice.reducer
