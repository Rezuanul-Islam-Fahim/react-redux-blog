import { createListenerMiddleware } from '@reduxjs/toolkit'
import { addPostsListener } from '@/features/posts'

export const listenerMiddleware = createListenerMiddleware()
export const startAppListening = listenerMiddleware.startListening

addPostsListener(startAppListening)
