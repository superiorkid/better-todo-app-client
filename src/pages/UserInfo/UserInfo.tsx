import {FC, useEffect} from "react";
import {Heading} from "@chakra-ui/react";
import axios, {AxiosRequestHeaders} from "axios";

const UserInfo: FC = () => {
    useEffect(() => {
        const getUsetInfo = async () => {
            try {
                const {data} = await axios.get("http://localhost:5000/user/user-info", {
                    headers: {
                        Authorization: `Bearier ${localStorage.getItem("token")}`
                    } as AxiosRequestHeaders
                })
                console.log(data)
            } catch (e) {
                console.log(e)
            }
        }
        getUsetInfo()

    })

    return (
        <Heading>User Info</Heading>
    )
}

export default UserInfo