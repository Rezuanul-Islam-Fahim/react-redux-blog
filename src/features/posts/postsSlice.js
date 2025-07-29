import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { userLoggedOut } from '@/features/auth'
import { client } from '@/api/client'

const initialReactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

const initialPosts = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingItem = state.posts.find(e => e.id === id)

      if (existingItem) {
        existingItem.title = title
        existingItem.content = content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, emojiName } = action.payload
      const post = state.posts.find(e => e.id === postId)

      if (post) {
        post.reactions[emojiName]++
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userLoggedOut, _ => initialPosts)
      .addCase(fetchPosts.pending, state => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  },
})

export const postsReducer = postsSlice.reducer
export const { postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, id) =>
  state.posts.posts.find(e => e.id === id)
export const selectPostsStatus = state => state.posts.status
export const selectPostsError = state => state.posts.error

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
