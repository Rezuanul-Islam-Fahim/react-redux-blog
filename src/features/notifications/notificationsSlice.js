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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export const notificationsReducer = notificationsSlice.reducer
export const selectAllNotifications = state => state.notifications
