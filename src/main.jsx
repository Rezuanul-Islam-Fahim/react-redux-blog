import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './styles/index.css'
import { App, store } from './app'
import { worker } from './api/server'
import { fetchUsers } from './features/users'

const start = async () => {
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(fetchUsers())

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}

start()
