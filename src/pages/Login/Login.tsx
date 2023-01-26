import {FC, useState} from "react";
import {
    Box,
    Container,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Input, Button, FormErrorMessage, InputGroup, InputRightElement, Center, useToast, CardFooter, Text, Link
} from "@chakra-ui/react";
import {useForm, SubmitHandler, UseFormReturn} from "react-hook-form";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import axios from 'axios'
import {useNavigate, Link as RRDLink} from "react-router-dom";


type LoginInputs = {
    email: string,
    password: string
}

type loginUserResponse = {
    code: number,
    status: string,
    message: string,
    data: object
}

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(5).required()
})


const Login: FC = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<LoginInputs>({resolver: yupResolver(schema)})
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const onSubmitHandler: SubmitHandler<LoginInputs> = async (data) => {
        await axios
            .post<loginUserResponse>("http://localhost:5000/user/login", data)
            .then((res) => {
                localStorage.setItem("token", res.data.data.token)
                toast({
                    title: res.data.message,
                    position: "top",
                    isClosable: true,
                    status: "success"
                })
                navigate('/')
            })
            .catch((err) => {
                if (err.response.data.code === 404) {
                    toast({
                        title: err.response.data.message,
                        position: "top",
                        isClosable: true,
                        status: "error"
                    })
                } else if (err.response.data.code === 401) {
                    toast({
                        title: err.response.data.message,
                        position: "top",
                        isClosable: true,
                        status: "error"
                    })
                } else {
                    console.log(err)
                }
            })
    }
    const handleShowPassword = () => setShowPassword(!showPassword)

    return (
        <>
            <Center h={'calc(100vh)'}>
                <Container maxW={"2xl"} centerContent>
                    <Box padding={"4"} w={"md"}>
                        <Card>
                            <CardHeader bg={"black"}>
                                <Center>
                                    <Heading size={"lg"} color={"white"}>MERN + TS | Login</Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmitHandler)}>
                                    <Stack spacing={"4"}>
                                        <FormControl isInvalid={Boolean(errors.email)} isRequired>
                                            <FormLabel htmlFor={"email"}>E-mail</FormLabel>
                                            <Input type={"text"} placeholder={"Enter email"} {...register("email")} />
                                            <FormErrorMessage>
                                                {errors.email && errors.email.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={Boolean(errors.password)} isRequired>
                                            <FormLabel htmlFor={"password"}>Password</FormLabel>
                                            <InputGroup size={"md"}>
                                                <Input type={showPassword ? "text" : "password"}
                                                       placeholder={"Enter password"} {...register("password")} />
                                                <InputRightElement width={'4.5rem'}>
                                                    <Button h={"1.75rem"} size={"sm"} onClick={handleShowPassword}>
                                                        {showPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {errors.password && errors.password.message}
                                            </FormErrorMessage>
                                            <Button mt={4} colorScheme='teal' isLoading={isSubmitting}
                                                    type='submit'
                                                    loadingText={"Loading..."} spinnerPlacement={"end"}>
                                                Login
                                            </Button>
                                        </FormControl>
                                    </Stack>
                                </form>
                            </CardBody>
                            <CardFooter>
                                <Text as="span">Don't have an account? <Link as={RRDLink} to="/register"
                                                                             color="blue">Register</Link></Text>
                            </CardFooter>
                        </Card>
                    </Box>
                </Container>
            </Center>
        </>
    )
}

export default Login