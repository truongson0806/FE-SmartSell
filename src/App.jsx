import ChatBox from "./components/AIChat/ChatBox";
import { ToastContainer } from 'react-toastify'
import './App.css'
import { LoadingProvider } from './contexts/LoadingProvider'
import Router from './route/router'

function App() {
    return (
        <>
            <LoadingProvider>
                <Router />
            </LoadingProvider>
            <ToastContainer />
        </>
    )
}

export default App
