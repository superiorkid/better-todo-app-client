import {FC, ReactNode} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const PublicRoute: FC = ({children}: ReactNode) => {
    const location = useLocation()
    const auth = localStorage.getItem("token")

    if (auth) {
        return <Navigate to="/" state={{from: location}} replace/>
    }

    return children
}

export default PublicRoute