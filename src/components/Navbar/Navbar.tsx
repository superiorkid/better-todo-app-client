import {FC} from "react";
import {Link} from "react-router-dom";

const Navbar: FC = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar