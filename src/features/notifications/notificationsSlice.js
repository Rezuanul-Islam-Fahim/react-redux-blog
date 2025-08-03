import { client } from '@/api/client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialNotifications = []

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkApi) => {
    const allNotifications = selectAllNotifications(thunkApi.getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      '/fakeApi/notifications?since=' + latestTimestamp
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotifications,
  reducers: {
    allNotificationsRead: state => {
      state.forEach(notification => {
        notification.read = true
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      const notificationsWithMetadata = action.payload.map(notification => ({
        ...notification,
        read: false,
        isNew: true,
      }))

      state.forEach(notification => {
        notification.isNew = !notification.read
      })

      state.push(...notificationsWithMetadata)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export const notificationsReducer = notificationsSlice.reducer
export const { allNotificationsRead } = notificationsSlice.actions
export const selectAllNotifications = state => state.notifications

export const selectUnreadNotificationsCount = state => {
  const allNotifications = selectAllNotifications(state)
  const unreadNotifications = allNotifications.filter(
    notification => !notification.read
  )

  return unreadNotifications.length
}
