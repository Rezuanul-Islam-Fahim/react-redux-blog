import { Link } from 'react-router'

const NavBar = () => {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          React Redux Blog
        </Link>
      </div>
      {/* <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
        </ul>
      </div> */}
    </div>
  )
}

export default NavBar
