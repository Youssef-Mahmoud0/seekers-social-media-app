import './App.css'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import ProfilePage from './pages/profilePage/ProfilePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/profile/:userId' element={<ProfilePage/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App