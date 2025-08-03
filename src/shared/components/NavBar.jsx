import { selectUser } from '@/features/users'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { CircleUserRound } from 'lucide-react'
import { logout } from '@/features/auth'
import {
  fetchNotifications,
  selectUnreadNotificationsCount,
} from '@/features/notifications'

const NavBar = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(selectUser)
  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount)
  let navMenuEnd = null
  let navMenuStart = null

  if (!!loggedUser) {
    const handleLogout = () => {
      dispatch(logout())
    }

    let notificationBadge = null

    if (unreadNotificationsCount > 0) {
      notificationBadge = (
        <div className="badge badge-secondary">{unreadNotificationsCount}</div>
      )
    }

    navMenuStart = (
      <>
        <li>
          <Link
            className="text-sm font-medium text-current hover:text-current active:text-current focus:text-current"
            to="/posts"
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            className="text-sm font-medium text-current hover:text-current active:text-current focus:text-current"
            to="/users"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            className="text-sm font-medium text-current hover:text-current active:text-current focus:text-current"
            to="/notifications"
          >
            Notifications
            {notificationBadge}
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              dispatch(fetchNotifications())
            }}
            className="btn btn-accent btn-xs text-sm font-medium"
          >
            Refresh Notifications
          </button>
        </li>
      </>
    )

    navMenuEnd = (
      <>
        <li className="pointer-events-none">
          <div className="flex items-center gap-2">
            <CircleUserRound width={25} height={25} />
            <p className="text-sm font-medium">{loggedUser.name}</p>
          </div>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-current hover:text-current active:text-current focus:text-current"
          >
            Logout
          </button>
        </li>
      </>
    )
  }

  return (
    <div className="navbar bg-primary text-primary-content">
      <ul className="menu menu-horizontal items-center px-1 w-full flex">
        <li className="pointer-events-none">
          <p className="text-xl">React Redux Blog</p>
        </li>
        {navMenuStart}
        <div className="flex-1" />
        {navMenuEnd}
      </ul>
    </div>
  )
}

export default NavBar
