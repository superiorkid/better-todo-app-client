import {FC, useState} from "react";
import {
    Box, Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Center,
    Container,
    FormControl, FormErrorMessage,
    FormLabel,
    Heading, Input, InputGroup, InputRightElement,
    Stack,
    useToast, Text, Link
} from "@chakra-ui/react";
import {SubmitHandler, useForm} from "react-hook-form";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {Link as RRDLink, useNavigate} from "react-router-dom";


const schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(5).required(),
    confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Password must match")
})

type RegisterInputs = {
    username: string,
    email: string,
    password: string,
    confirm_password: string
}

type userRegisterResponse = {
    code: number,
    status: string,
    message: string
}

const Register: FC = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<RegisterInputs>({resolver: yupResolver(schema)})
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const onSubmitHandler: SubmitHandler<RegisterInputs> = async (data) => {
        console.log(data)
        await axios
            .post<userRegisterResponse>("http://localhost:5000/user/register", data)
            .then((res) => {
                toast({
                    description: res.data.message,
                    status: "success",
                    position: "top",
                    isClosable: true,
                    duration: 5000
                })
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

    return (
        <>
            <Center h={'calc(100vh)'}>
                <Container maxW={"2xl"} centerContent p={"4"}>
                    <Box padding={"4"} w={"md"}>
                        <Card>
                            <CardHeader bg={"black"}>
                                <Center>
                                    <Heading size={"lg"} color={"white"}>MERN + TS | Register</Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmitHandler)}>
                                    <Stack spacing={"4"}>
                                        <FormControl isInvalid={Boolean(errors.username)} isRequired>
                                            <FormLabel htmlFor={"email"}>Username</FormLabel>
                                            <Input
                                                type={"text"}
                                                placeholder={"Enter username"}
                                                {...register("username")}
                                            />
                                            <FormErrorMessage>
                                                {errors.username && errors.username.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={Boolean(errors.email)} isRequired>
                                            <FormLabel htmlFor={"email"}>E-mail</FormLabel>
                                            <Input
                                                type={"text"}
                                                placeholder={"Enter email"}
                                                {...register("email")}
                                            />
                                            <FormErrorMessage>
                                                {errors.email && errors.email.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={Boolean(errors.password)} isRequired>
                                            <FormLabel htmlFor={"password"}>Password</FormLabel>
                                            <InputGroup size={"md"}>
                                                <Input
                                                    pr={"4.5rem"}
                                                    placeholder={"Enter password"}
                                                    type={showPassword ? "text" : "password"}
                                                    {...register("password")}
                                                />
                                                <InputRightElement width={'4.5rem'}>
                                                    <Button h={"1.75rem"} size={"sm"} onClick={handleShowPassword}>
                                                        {showPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {errors.password && errors.password.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={Boolean(errors.confirm_password)} isRequired>
                                            <FormLabel htmlFor={"confirm_password"}>Confirm Password</FormLabel>
                                            <InputGroup size={"md"}>
                                                <Input
                                                    pr={"4.5rem"}
                                                    placeholder={"Confirm password"}
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    {...register("confirm_password")}
                                                />
                                                <InputRightElement width={'4.5rem'}>
                                                    <Button h={"1.75rem"} size={"sm"}
                                                            onClick={handleShowConfirmPassword}>
                                                        {showConfirmPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>
                                                {errors.confirm_password && errors.confirm_password.message}
                                            </FormErrorMessage>
                                            <Button mt={4} colorScheme='teal' isLoading={isSubmitting}
                                                    type='submit'
                                                    loadingText={"Loading..."} spinnerPlacement={"end"}>
                                                Register
                                            </Button>
                                        </FormControl>
                                    </Stack>
                                </form>
                            </CardBody>
                            <CardFooter>
                                <Text as="span">Have an account? <Link as={RRDLink} to='/login'
                                                                       color="blue">Login</Link></Text>
                            </CardFooter>
                        </Card>
                    </Box>
                </Container>
            </Center>
        </>
    )
}

export default Register