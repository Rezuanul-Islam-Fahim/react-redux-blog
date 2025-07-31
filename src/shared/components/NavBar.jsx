import { selectUser } from '@/features/users'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { CircleUserRound } from 'lucide-react'
import { logout } from '@/features/auth'

const NavBar = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(selectUser)
  let navMenuEnd = null
  let navMenuStart = null

  if (!!loggedUser) {
    const handleLogout = () => {
      dispatch(logout())
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
          </Link>
        </li>
      </>
    )

    navMenuEnd = (
      <div className="navbar-end">
        <ul className="menu menu-horizontal items-center px-1">
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
        </ul>
      </div>
    )
  }

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <ul className="menu menu-horizontal items-center px-1">
          <li className="pointer-events-none">
            <p className="text-xl">React Redux Blog</p>
          </li>
          {navMenuStart}
        </ul>
      </div>
      {navMenuEnd}
    </div>
  )
}

export default NavBar
