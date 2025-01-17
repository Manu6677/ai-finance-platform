import { useState } from "react"
import { toast } from "sonner";

const useFetch = (cb) => {

    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fn = async(...args)=>{
        setLoading(true);
        setError(null);

        try {            
            console.log(...args);
            const response = await cb(...args); 
            console.log(response);
            setData(response);
            setError(null);
            
        } catch (error) {
            setError(error)
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return { data, error, loading, setData, fn }
}

export default useFetch