import { Outlet } from 'react-router'
import NavBar from '@/shared/components/NavBar'

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default MainLayout
