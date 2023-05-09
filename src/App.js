import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RequireAuth><ChatPage/></RequireAuth>}/>
                    <Route path='login' element={<LoginPage/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
);
}

export default App;
