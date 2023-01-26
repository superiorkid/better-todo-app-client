import {FC, ReactNode} from "react";
import {Navigate, useLocation, Outlet} from "react-router-dom";

const ProtectedRoute: FC = ({children}: ReactNode) => {
    const location = useLocation()
    const auth = localStorage.getItem("token")

    if (!auth) {
        return <Navigate to='/login' state={{from: location}} replace/>
    }

    return children
}

export default ProtectedRoute