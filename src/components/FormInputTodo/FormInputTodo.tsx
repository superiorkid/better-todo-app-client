import {FC} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    CardHeader,
    CardBody, Card, Center, Textarea, FormErrorMessage
} from "@chakra-ui/react";
import axios, {AxiosRequestHeaders} from "axios";
import {useToast} from "@chakra-ui/react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup'

type Inputs = {
    title: string,
    todo: string
}

const schema = Yup.object().shape({
    title: Yup.string().required(),
    todo: Yup.string().required()
})

const FormInputTodo: FC = () => {
    const toast = useToast()
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({resolver: yupResolver(schema)})
    const todoHandleSubmit: SubmitHandler<Inputs> = async (value) => {
        try {
            await axios.post('http://localhost:5000/todos/', value, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                } as AxiosRequestHeaders
            }).then((res) => {
                toast({
                    title: res.data.message,
                    position: "top",
                    isClosable: true,
                    status: "success",
                    duration: 5000
                })
                reset()
            })
        } catch (err) {
            console.log(err)
            toast({
                title: err.response.data.message,
                position: "top",
                isClosable: true,
                status: "error",
                duration: 5000
            })
        }
    }

    return (
        <Box p={"4"} mb={"4"}>
            <Container maxW={"container.sm"}>
                <Box p={"4"}>
                    <Card>
                        <CardHeader>
                            <Center>
                                <Heading size='lg'>Add your todo</Heading>
                            </Center>
                        </CardHeader>

                        <CardBody>

                            <Box>
                                <form onSubmit={handleSubmit(todoHandleSubmit)}>
                                    <Stack spacing={"4"}>
                                        <FormControl isInvalid={Boolean(errors.title)}>
                                            <FormLabel htmlFor={"title"}>Title</FormLabel>
                                            <Input type={"text"} placeholder={"input title"} {...register("title")} />
                                            <FormErrorMessage>
                                                {errors.title && errors.title.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={Boolean(errors.todo)}>
                                            <FormLabel htmlFor={"todo"}>Todo</FormLabel>
                                            <Textarea id={"todo"}
                                                      placeholder={"enter your todo"} {...register("todo")} />
                                            <FormErrorMessage>
                                                {errors.todo && errors.todo.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </Stack>
                                    <Button colorScheme={"teal"} mt={"4"} type={"submit"} isLoading={isSubmitting}>Add
                                        todo</Button>
                                </form>
                            </Box>
                        </CardBody>
                    </Card>

                </Box>
            </Container>
        </Box>
    )
}

export default FormInputTodo