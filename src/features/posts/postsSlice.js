import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialPosts = [
  {
    id: '0',
    title: 'Post 1',
    content: 'This is post 1',
    userId: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: '1',
    title: 'Post 2',
    content: 'This is post 2',
    userId: '0',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingItem = state.find(e => e.id === id)

      if (existingItem) {
        existingItem.title = title
        existingItem.content = content
      }
    },
  },
})

export const postsReducer = postsSlice.reducer
export const { postAdded, postUpdated } = postsSlice.actions

export const selectAllPosts = state => state.posts
export const selectPostById = (state, id) => state.posts.find(e => e.id === id)
