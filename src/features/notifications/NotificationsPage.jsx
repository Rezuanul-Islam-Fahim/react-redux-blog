import { useDispatch, useSelector } from 'react-redux'
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'
import PostAuthor from '@/features/posts/components/PostAuthor'
import TimeAgo from '@/features/posts/components/TimeAgo'
import classnames from 'classnames'
import { useLayoutEffect } from 'react'

const NotificationsPage = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  return (
    <section className="max-w-3xl mx-auto mt-6 px-4">
      <h3 className="text-4xl font-semibold mb-8">Notifications</h3>
      {notifications.map(notification => {
        const notificationClassname = classnames('p-4', 'border', {
          'bg-blue-100': notification.isNew,
        })

        return (
          <div key={notification.id} className={notificationClassname}>
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
        )
      })}
    </section>
  )
}

export default NotificationsPage
