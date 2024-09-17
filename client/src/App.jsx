import './App.css'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path='/home' element={<HomePage />} />
                    
                    {/* <Route path="/signup" element={<SignupForm />} /> */}
                </Routes>
            </Router>
        </>
    )
}

export default App