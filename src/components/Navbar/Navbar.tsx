import {FC} from "react";
import {Box, Button, ButtonGroup, Center, Container, Flex, Heading, Spacer, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Navbar: FC = () => {
    return (
        <>
            <Center h={"150px"} bg={"teal.200"}>
                <Heading color={"white"}>MERN TODO APP</Heading>
            </Center>
        </>
    )
}

export default Navbar