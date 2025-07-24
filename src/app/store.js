import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from '@/features/posts'
import { usersReducer } from '@/features/users'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
})
