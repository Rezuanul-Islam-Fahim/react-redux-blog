import { selectUser } from '@/features/users'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { CircleUserRound } from 'lucide-react'
import { userLoggedOut } from '@/features/auth'

const NavBar = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(selectUser)
  let navMenu = null

  if (!!loggedUser) {
    const handleLogout = () => {
      dispatch(userLoggedOut())
    }

    navMenu = (
      <div className="flex-none">
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
      <div className="flex-1">
        <Link to="/posts" className="btn btn-ghost text-xl">
          React Redux Blog
        </Link>
      </div>
      {navMenu}
    </div>
  )
}

export default NavBar
