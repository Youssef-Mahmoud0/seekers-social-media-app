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
                    <Route path='/profile' element={<ProfilePage />} />
                    {/* <Route path="/signup" element={<SignupForm />} /> */}
                    </Routes>
            </Router>
            {/* <EditPost /> */}
        </>
    )
}

export default App