import {FC, useEffect, useState} from "react";
import {Heading, Box, Text} from "@chakra-ui/react";
import axios, {AxiosRequestHeaders} from "axios";
import Layout from "../../components/Layout/Layout";

interface UserInfo {
    _id: string,
    username: string,
    email: string
    todos: object
}

const UserInfo: FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({})

    useEffect(() => {
        const getUsetInfo = async () => {
            try {
                const {data} = await axios.get(`http://localhost:5000/user/info`, {
                    headers: {
                        Authorization: `Bearier ${localStorage.getItem("token")}`
                    } as AxiosRequestHeaders
                })
                setUserInfo(data.data)
            } catch (e) {
                console.log(e)
            }
        }
        getUsetInfo()

    }, [])

    return (
        <Layout>
            <Box p={4} border="1px" borderRadius="lg" overflow="hidden">
                <Heading as="h1">{userInfo.username}</Heading>
                <Text as="p">Your Email: {userInfo.email}</Text>
            </Box>
        </Layout>
    )
}

export default UserInfo