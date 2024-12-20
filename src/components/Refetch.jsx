import { useEffect } from "react";
import { useGetTodosQuery } from "../redux/todosApiSlice";

const Refetch = () => {
    const { isLoading, isSuccess, refetch } = useGetTodosQuery("", {
        pollingInterval: 2000
    })

    useEffect(() => {
        refetch()
    }, [refetch])

    if(isLoading) return <p style={{color: "aqua"}}>Loading...</p>
    if(isSuccess) return <p style={{color: "green"}}>Refetch component</p>
};

export default Refetch;