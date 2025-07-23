import { createSlice } from '@reduxjs/toolkit'

const initialPosts = [
  { id: 0, title: 'Post 1', content: 'This is post 1' },
  { id: 1, title: 'Post 2', content: 'This is post 2' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {},
})

export const postsReducer = postsSlice.reducer
