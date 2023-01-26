import {FC} from "react";
import Layout from "../../components/Layout/Layout";
import FormInputTodo from "../../components/FormInputTodo/FormInputTodo";
import DisplayTodo from "../../components/DisplayTodo/DisplayTodo";
import {Box} from "@chakra-ui/react";

const Homepage: FC = () => {
    return (
        <Layout>
            <FormInputTodo/>

            <Box>
                <DisplayTodo/>
            </Box>
        </Layout>
    )
}

export default Homepage