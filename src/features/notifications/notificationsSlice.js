import { client } from '@/api/client'
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState()

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
  initialState: initialState,
  reducers: {
    allNotificationsRead: state => {
      Object.values(state.entities).forEach(notification => {
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

      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read
      })

      notificationsAdapter.upsertMany(state, notificationsWithMetadata)
    })
  },
})

export const notificationsReducer = notificationsSlice.reducer
export const { allNotificationsRead } = notificationsSlice.actions

export const {
  selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors(state => state.notifications)

export const selectUnreadNotificationsCount = state => {
  const allNotifications = selectAllNotifications(state)
  const unreadNotifications = allNotifications.filter(
    notification => !notification.read
  )

  return unreadNotifications.length
}
