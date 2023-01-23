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
import {useForm, SubmitHandler, UseFormReturn} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";


type LoginInputs = {
    email: string,
    password: string
}


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required()
})


const Login: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset
    } = useForm<LoginInputs>({resolver: yupResolver(schema)})
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const onSubmit: SubmitHandler<LoginInputs> = data => {
        console.log(data)
        reset()
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
                                <form onSubmit={handleSubmit(onSubmit)}>
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
                        </Card>
                    </Box>
                </Container>
            </Center>
        </>
    )
}

export default Login