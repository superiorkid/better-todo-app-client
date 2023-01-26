import {FC} from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import UserInfo from "./pages/UserInfo/UserInfo";
import ProtectedRoute from "./utils/ProtectedRoute";
import PublicRoute from "./utils/PublicRoute";
import DetailTodo from "./pages/DetailTodo/DetailTodo";

const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path={"/"} element={
                    <ProtectedRoute>
                        <Homepage/>
                    </ProtectedRoute>
                }/>
                <Route path={"/todo/:id"} element={
                    <ProtectedRoute>
                        <DetailTodo/>
                    </ProtectedRoute>
                }/>
                <Route path={"/user/info"} element={
                    <ProtectedRoute>
                        <UserInfo/>
                    </ProtectedRoute>
                }/>
                <Route path={"/login"} element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }/>
                <Route path={"/register"} element={
                    <PublicRoute>
                        <Register/>
                    </PublicRoute>
                }/>
            </Routes>
        </>
    )
}
export default App
