import { configureStore } from '@reduxjs/toolkit'
import { postsReducer } from '@/features/posts'
import { usersReducer } from '@/features/users'
import { authReducer } from '@/features/auth'
import { notificationsReducer } from '@/features/notifications'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    auth: authReducer,
    notifications: notificationsReducer,
  },
})
