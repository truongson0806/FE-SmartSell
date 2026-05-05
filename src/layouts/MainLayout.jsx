// import Header from '@/components/header/Header'
import { Group } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/scroll-to-top/ScrollToTop'
// import Footer from '../components/footer/Footer'
import ChatBox from '../components/AIChat/ChatBox'

function MainLayout({ isFooter = true }) {
    return (
        <div>
            <ScrollToTop />
            {/* <Header /> */}
            {/* <NavBar /> */}
            <Group w={'100%'} justify="center">
                <Group maw={1440} w={'100%'}>
                    <Outlet />
                </Group>
            </Group>
            <ChatBox />
            {/* {isFooter && <Footer />} */}
        </div>
    )
}

export default MainLayout
