import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialPosts = [
  { id: '0', title: 'Post 1', content: 'This is post 1' },
  { id: '1', title: 'Post 2', content: 'This is post 2' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content) => {
        return { payload: { id: nanoid(), title, content } }
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
