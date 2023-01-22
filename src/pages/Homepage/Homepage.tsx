import {FC} from "react";
import Layout from "../../components/Layout/Layout";
import FormInputTodo from "../../components/FormInputTodo/FormInputTodo";

const Homepage: FC = () => {
    return (
        <Layout>
            <FormInputTodo/>

            <div>
                <h2>Homepage</h2>
            </div>
        </Layout>
    )
}

export default Homepage