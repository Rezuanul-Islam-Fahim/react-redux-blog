import { createSlice } from '@reduxjs/toolkit'

const initialNotifications = []

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotifications,
})

export const notificationsReducer = notificationsSlice.reducer
export const selectAllNotifications = state => state.notifications
