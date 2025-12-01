import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { factory, oneOf, manyOf, primaryKey } from '@mswjs/data'
import { nanoid } from '@reduxjs/toolkit'
import { faker } from '@faker-js/faker/locale/en'
import { Server as MockSocketServer } from 'mock-socket'

import { parseISO } from 'date-fns'

const NUM_USERS = 3
const POSTS_PER_USER = 3
const RECENT_NOTIFICATIONS_DAYS = 7
const ARTIFICIAL_DELAY_MS = 2000

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

let useSeededRNG = true

if (useSeededRNG) {
  let randomSeedString = localStorage.getItem('randomTimestampSeed')
  let seedDate

  if (randomSeedString) {
    seedDate = new Date(randomSeedString)
  } else {
    seedDate = new Date()
    randomSeedString = seedDate.toISOString()
    localStorage.setItem('randomTimestampSeed', randomSeedString)
  }

  faker.seed(seedDate.getTime())
}

function getRandomInt(min, max) {
  return faker.number.int({ min, max })
}

const randomFromArray = array => {
  const index = getRandomInt(0, array.length - 1)
  return array[index]
}

const firstFromArray = items => {
  return [].concat(items)[0]
}

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    posts: manyOf('post'),
  },
  post: {
    id: primaryKey(nanoid),
    title: String,
    date: String,
    content: String,
    reactions: oneOf('reaction'),
    comments: manyOf('comment'),
    user: oneOf('user'),
  },
  comment: {
    id: primaryKey(String),
    date: String,
    text: String,
    post: oneOf('post'),
  },
  reaction: {
    id: primaryKey(nanoid),
    thumbsUp: Number,
    tada: Number,
    heart: Number,
    rocket: Number,
    eyes: Number,
    post: oneOf('post'),
  },
})

const createUserData = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    username: faker.internet.username(),
  }
}

const createPostData = user => {
  return {
    title: faker.lorem.words(),
    date: faker.date.recent({ days: RECENT_NOTIFICATIONS_DAYS }).toISOString(),
    user,
    content: faker.lorem.paragraphs(),
    reactions: db.reaction.create(),
  }
}

for (let i = 0; i < NUM_USERS; i++) {
  const author = db.user.create(createUserData())
  for (let j = 0; j < POSTS_PER_USER; j++) {
    const newPost = createPostData(author)
    db.post.create(newPost)
  }
}

const serializePost = post => ({
  ...post,
  user: post.user.id,
})

let currentUser = null

export const handlers = [
  http.post('/fakeApi/login', async ({ request }) => {
    const data = await request.json()
    currentUser = data.username
    return HttpResponse.json({ success: true })
  }),
  http.post('/fakeApi/logout', async () => {
    currentUser = null
    return HttpResponse.json({ success: true })
  }),
  http.get('/fakeApi/posts', async () => {
    const posts = db.post.getAll().map(serializePost)
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(posts)
  }),
  http.post('/fakeApi/posts', async ({ request }) => {
    const data = await request.json()

    if ('content' in data && data.content === 'error') {
      await delay(ARTIFICIAL_DELAY_MS)
      return new HttpResponse(
        JSON.stringify('Server error saving this post!'),
        { status: 500 }
      )
    }

    data.date = new Date().toISOString()
    const userId = data.user

    const user = db.user.findFirst({ where: { id: { equals: userId } } })
    data.user = user
    data.reactions = db.reaction.create()

    const post = db.post.create(data)
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(serializePost(post))
  }),
  http.get('/fakeApi/posts/:postId', async ({ params }) => {
    const postId = firstFromArray(params.postId)
    const post = db.post.findFirst({ where: { id: { equals: postId } } })
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(serializePost(post))
  }),
  http.patch('/fakeApi/posts/:postId', async ({ request, params }) => {
    const { id, ...data } = await request.json()
    const postId = firstFromArray(params.postId)
    const updatedPost = db.post.update({
      where: { id: { equals: postId } },
      data,
    })
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(serializePost(updatedPost))
  }),
  http.get('/fakeApi/posts/:postId/comments', async ({ params }) => {
    const postId = firstFromArray(params.postId)
    const post = db.post.findFirst({ where: { id: { equals: postId } } })
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json({ comments: post.comments })
  }),
  http.post('/fakeApi/posts/:postId/reactions', async ({ request, params }) => {
    const postId = firstFromArray(params.postId)
    const { reaction } = await request.json()
    const post = db.post.findFirst({ where: { id: { equals: postId } } })

    const updatedPost = db.post.update({
      where: { id: { equals: postId } },
      data: {
        reactions: {
          ...post.reactions,
          [reaction]: (post.reactions[reaction] += 1),
        },
      },
    })

    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(serializePost(updatedPost))
  }),
  http.get('/fakeApi/notifications', async ({ request }) => {
    const parsedUrl = new URL(request.url)
    const since = parsedUrl.searchParams.get('since') ?? undefined
    const numNotifications = getRandomInt(1, 5)

    const notifications = generateRandomNotifications(
      since,
      currentUser,
      numNotifications,
      db
    )

    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(notifications)
  }),
  http.get('/fakeApi/users', async () => {
    await delay(ARTIFICIAL_DELAY_MS)
    return HttpResponse.json(db.user.getAll())
  }),
]

export const worker = setupWorker(...handlers)

/* WebSocket Setup */

const socketServer = new MockSocketServer('ws://localhost')
let currentSocket

const getSocket = () => {
  if (!currentSocket) {
    alert('No socket connection - please set up notifications logic first')
    throw new Error('No socket connection')
  }
  return currentSocket
}

const sendMessage = obj => {
  getSocket().send(JSON.stringify(obj))
}

const sendRandomNotifications = since => {
  const numNotifications = getRandomInt(1, 5)
  const notifications = generateRandomNotifications(
    since,
    currentUser,
    numNotifications,
    db
  )
  sendMessage({ type: 'notifications', payload: notifications })
}

export const forceGenerateNotifications = since => {
  sendRandomNotifications(since)
}

socketServer.on('connection', socket => {
  currentSocket = socket

  socket.on('message', data => {
    const message = JSON.parse(data)

    if (message.type === 'notifications') {
      const since = message.payload
      sendRandomNotifications(since)
    }
  })
})

const notificationTemplates = [
  'poked you',
  'says hi!',
  `is glad we're friends`,
  'sent you a gift',
]

function generateRandomNotifications(since, currentUser, numNotifications, db) {
  const now = new Date()
  let pastDate = since ? parseISO(since) : new Date(now.getTime() - 15 * 60000)

  return [...Array(numNotifications)].map(() => {
    const allUsers = db.user.getAll()
    const otherUsers = allUsers.filter(user => user.id !== currentUser)
    const user = randomFromArray(otherUsers)
    const template = randomFromArray(notificationTemplates)

    return {
      id: nanoid(),
      date: faker.date.between({ from: pastDate, to: now }).toISOString(),
      message: template,
      user: user.id,
    }
  })
}
