import {
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { logout } from '@/features/auth'
import { client } from '@/api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      postsAdapter.updateOne(state, {id, changes: {title, content}})
    },
    reactionAdded: (state, action) => {
      const { postId, emojiName } = action.payload
      const post = state.entities[postId]

      if (post) {
        post.reactions[emojiName]++
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logout.fulfilled, _ => initialPosts)
      .addCase(fetchPosts.pending, state => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.setAll(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      })
      .addCase(createPost.fulfilled, postsAdapter.addOne)
  },
})

export const postsReducer = postsSlice.reducer
export const { postUpdated, reactionAdded } = postsSlice.actions

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsStatus = state => state.posts.status
export const selectPostsError = state => state.posts.error

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) => posts.filter(p => p.user === userId)
)

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  },
  {
    condition: (_, thunkApi) => {
      const postsStatus = selectPostsStatus(thunkApi.getState())

      if (postsStatus !== 'idle') {
        return false
      }
    },
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async newPost => {
    const response = await client.post('/fakeApi/posts', newPost)
    return response.data
  }
)
