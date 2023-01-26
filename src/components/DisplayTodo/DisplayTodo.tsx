import {FC, useEffect, useState} from "react";
import {Heading, Tabs, TabList, Tab, TabPanels, TabPanel, useAccordionStyles, HStack, VStack} from "@chakra-ui/react";
import DisplayTodoCard from "./DisplayTodoCard/DisplayTodoCard";
import axios, {AxiosRequestHeaders} from "axios";

interface ITodo {
    title: string,
    todo: string,
    is_completed: boolean,
    created_at: Date,
    update_at: Date
}

type TodoResponse = {
    code: number,
    status: string,
    message: string,
    data: Array<ITodo>
}

const DisplayTodo: FC = () => {
    const [todos, setTodos] = useState<Array<ITodo>>([])

    useEffect(() => {
        const getTodos = async () => {
            try {
                const {data, status} = await axios.get<TodoResponse>('http://localhost:5000/todos/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    } as AxiosRequestHeaders
                })
                setTodos(data.data)
            } catch (err) {
                console.log(err)
            }
        }

        getTodos()
    })

    return (
        <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>All</Tab>
                <Tab>Complete</Tab>
                <Tab>Incomplete</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <VStack spacer={"10px"}>
                        {todos.map((todo, index) => (
                            <DisplayTodoCard key={index} todo={todo}/>
                        ))}
                    </VStack>
                </TabPanel>
                <TabPanel>
                    {todos.filter((predicate) => predicate.is_completed === true).map((todo, index) => (
                        <DisplayTodoCard key={index} todo={todo}/>
                    ))}
                </TabPanel>
                <TabPanel>
                    {todos.filter((predicate) => predicate.is_completed === false).map((todo, index) => (
                        <DisplayTodoCard key={index} todo={todo}/>
                    ))}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default DisplayTodo