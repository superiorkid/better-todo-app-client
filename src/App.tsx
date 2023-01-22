import {FC} from 'react'
import {Routes, Route} from 'react-router-dom'
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";

const App: FC = () => {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Homepage/>} />
                <Route path={"/login"} element={<Login/>} />
                <Route path={"/register"} element={<Register/>} />
            </Routes>
        </>
    )
}
export default App
