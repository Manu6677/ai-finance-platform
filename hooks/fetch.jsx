import { useState } from "react"
import { toast } from "sonner";

const useFetch = (cb) => {

    console.log('callback it is', cb);

    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fn = async(...args)=>{
        console.log('Arguments:', args); 
        setLoading(true);
        setError(null);

        try {            
            const response = await cb(...args); // Executes `createAccount` with form data
            console.log('API Response:', response); 
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