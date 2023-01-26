import {FC, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {Box, Button, Center, Heading, Stack, Text} from "@chakra-ui/react";
import {ArrowBackIcon} from '@chakra-ui/icons'

interface DetailTodo {
    _id: string
    title: string,
    todo: string,
    is_completed: boolean,
    created_at: Date,
    updated_at: Date
}

const DetailTodo: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [todoDetail, setTodoDetail] = useState<DetailTodo>({})

    useEffect(() => {
        const getTodoDetail = async () => {
            try {
                const {data} = await axios.get(`http://localhost:5000/todos/${id}`)
                setTodoDetail(data.data)
            } catch (e) {
                console.log(e)
            }
        }

        getTodoDetail()
    }, [])

    return (
        <Layout>
            <Box w="full" p="10px" borderWidth="1px" borderRadius="lg" overflow="hidden"
                 bg={todoDetail.is_completed ? "green.200" : "red.200"}>
                <Center>
                    <Heading mb="11px" as="h4">{todoDetail.title}</Heading>
                </Center>
                <Stack spacing="3">
                    <Text as="samp">description: {todoDetail.todo}</Text>
                    <Text as="samp">created at: {todoDetail.created_at}</Text>
                    <Text as="samp"
                          color={todoDetail.is_completed ? "green" : "red"}>Status: {todoDetail.is_completed ? "Completed" : "Incomplete"}</Text>
                </Stack>
            </Box>
            <Button my="5px" colorScheme="red" size="sm" variant="solid" leftIcon={<ArrowBackIcon/>}
                    onClick={() => navigate(-1)}>Back</Button>
        </Layout>
    )
}

export default DetailTodo