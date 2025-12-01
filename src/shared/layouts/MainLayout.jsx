import { Outlet } from 'react-router'
import NavBar from '@/shared/components/NavBar'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
