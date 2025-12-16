import { Outlet } from 'react-router'
import NavBar from '@/shared/components/NavBar'
import ScrollToTop from '../components/ScrollToTop'
import { ToastContainer } from 'react-tiny-toast'

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  )
}

export default MainLayout
