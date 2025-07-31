import { useSelector } from 'react-redux'
import { selectAllNotifications } from './notificationsSlice'
import PostAuthor from '@/features/posts/components/PostAuthor'
import TimeAgo from '@/features/posts/components/TimeAgo'

const NotificationsPage = () => {
  const notifications = useSelector(selectAllNotifications)

  return (
    <section className="max-w-3xl mx-auto mt-6 space-y-4 px-4">
      <h3 className="text-4xl font-semibold mb-8">Notifications</h3>
      {notifications.map(notification => (
        <div key={notification.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-1">
            <b>
              <PostAuthor userId={notification.user} showPrefix={false} />
            </b>
            <span>{notification.message}</span>
          </div>
          <div className="text-gray-500 text-sm mt-1">
            <TimeAgo timestamp={notification.date} />
          </div>
        </div>
      ))}
    </section>
  )
}

export default NotificationsPage
