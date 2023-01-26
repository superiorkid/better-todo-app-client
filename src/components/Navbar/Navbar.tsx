import {FC} from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container,
    Flex,
    Heading,
    Spacer,
    Text,
    Link,
    useToast
} from "@chakra-ui/react";
import {Link as RRDLink, useNavigate} from "react-router-dom";

const Navbar: FC = () => {
    const toast = useToast()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await localStorage.removeItem("token")
        toast({
            title: "Log out successfully",
            position: "top",
            isClosable: true,
            status: "success",
            duration: 5000
        })
        navigate("/")
    }

    return (
        <>
            <Center h={"150px"} bg="tomato">
                <Heading color={"white"}>MERN + ts | Todo App</Heading>
            </Center>
            <Flex p={4} bg="grey.200" alignItems="center">
                <Box>
                    <Text></Text>
                </Box>
                <Spacer/>

                <ButtonGroup gap='2'>
                    <Button colorScheme='blue' onClick={() => navigate('/')}>
                        Home
                    </Button>

                    <Button colorScheme='yellow' onClick={() => navigate('/user/info')}>
                        Your Profile
                    </Button>

                    <Button colorScheme='red' onClick={logoutHandler}>
                        Log Out
                    </Button>

                </ButtonGroup>
            </Flex>
        </>
    )
}

export default Navbar