import {FC, ReactNode} from "react";
import Navbar from "../Navbar/Navbar";
import {Container} from "@chakra-ui/react";

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({children}) => {
    return (
        <>
            <Container maxW={"1000px"}>
                <Navbar/>
                <main>
                    {children}
                </main>
            </Container>
        </>
    )
}

export default Layout