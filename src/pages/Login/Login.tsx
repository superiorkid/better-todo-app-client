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
    Input, Button, FormErrorMessage, InputGroup, InputRightElement, Center
} from "@chakra-ui/react";
import {useForm, SubmitHandler, Resolver} from "react-hook-form";

type LoginInputs = {
    email: string,
    password: string
}

const Login:FC = () => {
    const {register, handleSubmit, watch, formState: {errors, isSubmitting}} = useForm<LoginInputs>()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const onSubmit: SubmitHandler<LoginInputs> = data => {
       console.log(data)
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
                                    <Heading size={"lg"} color={"white"}>Login page</Heading>
                                </Center>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Stack spacing={"4"}>
                                        <FormControl isInvalid={Boolean(errors.email)} isRequired>
                                            <FormLabel htmlFor={"email"}>E-mail</FormLabel>
                                            <Input
                                                type={"text"}
                                                placeholder={"Enter email"}
                                                {...register("email", {
                                                    required: true,
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: 'Please enter a valid email',
                                                    },
                                                })}
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
                                                    {...register("password", {
                                                        required: true,
                                                        minLength: { value: 5, message: 'Minimum length should be 5' },
                                                    })}
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
                                            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' loadingText={"Loading..."} splinnerPlacement={"start"}>
                                                Login
                                            </Button>
                                        </FormControl>
                                    </Stack>
                                </form>
                            </CardBody>
                        </Card>
                    </Box>
                </Container>
            </Center>
        </>
    )
}

export default Login