import {FC} from "react";
import {Box, Card, CardBody, Heading, Text} from "@chakra-ui/react";

type Props = {
    todo: object
}

const DisplayTodoCard: FC = ({todo}: Props) => {
    return (
        <Box p={"3"} borderWidth={"1px"} w={"full"}>
            <Card bg={todo.is_completed ? "green.200" : "orange"}>
                <CardBody color={"white"}>
                    <Heading as={"h1"} size={"md"}>{todo.title}</Heading>
                    <Text mt={"15px"}>
                        {todo.todo}
                    </Text>
                </CardBody>
            </Card>
        </Box>
    )
}

export default DisplayTodoCard