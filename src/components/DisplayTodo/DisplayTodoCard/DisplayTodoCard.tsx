import React, {FC} from "react";
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Text, Tooltip, useToast,
    VStack,
    LinkBox,
    LinkOverlay
} from "@chakra-ui/react";
import {CheckIcon, DeleteIcon} from "@chakra-ui/icons";
import DisplayTodo from "../DisplayTodo";
import axios from "axios";
import * as Yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import {Link as RRDLink} from "react-router-dom";

type Props = {
    todo: object
}


const DisplayTodoCard: FC = ({todo}: Props) => {
    const toast = useToast()
    const onDeleteHandler = async (id: string) => {
        await axios
            .delete(`http://localhost:5000/todos/${id}`)
            .then((res) => {
                toast({
                    title: res.data.message,
                    position: "top",
                    isClosable: true,
                    status: "success",
                    duration: 5000
                })
            })
            .catch((err) => {
                toast({
                    title: err.response.data.message,
                    position: "top",
                    isClosable: true,
                    status: "error",
                    duration: 5000
                })
            })
    }

    const onUpdateHandler = async (id: string) => {
        await axios.put(`http://localhost:5000/todos/${id}`).then((res) => {
            toast({
                title: res.data.message,
                position: "top",
                isClosable: true,
                status: "success",
                duration: 5000
            })
        }).catch((err) => {
            toast({
                title: err.response.data.message,
                position: "top",
                isClosable: true,
                status: "error"
            })
        })
    }

    return (
        <LinkBox as="div" p="4px" w="full">
            <Card bg={todo.is_completed ? "green.200" : "orange"}>
                <CardBody color={"white"}>
                    <Flex>
                        <Box>
                            <Heading as={"h1"} size={"md"}>
                                <LinkOverlay as={RRDLink} to={`/todo/${todo._id}`}>
                                    {todo.title}
                                </LinkOverlay>
                            </Heading>
                            <Text mt={"15px"}>
                                {todo.todo}
                            </Text>
                        </Box>
                        <Spacer/>
                        <Box>
                            <VStack spacing="10px">
                                <IconButton onClick={() => onDeleteHandler(todo._id)} colorScheme="red"
                                            aria-label="delete" size="sm" icon={
                                    <Tooltip hasArrow label='Delete todo?' bg='gray.300' color='black'>
                                        <DeleteIcon/>
                                    </Tooltip>
                                }/>
                                {!todo.is_completed && (
                                    <IconButton onClick={() => onUpdateHandler(todo._id)} colorScheme="teal"
                                                aria-label="mark is complete" size="sm"
                                                icon={
                                                    <Tooltip hasArrow label='Mark as complete?' bg='gray.300'
                                                             color='black'>
                                                        <CheckIcon/>
                                                    </Tooltip>
                                                }/>
                                )}
                            </VStack>

                        </Box>
                    </Flex>
                </CardBody>
            </Card>
        </LinkBox>
    )
}

export default DisplayTodoCard