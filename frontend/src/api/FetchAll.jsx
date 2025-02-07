
//hente alle meldinger fra databasen 
import { useEffect, useState } from "react";

export default function FetchAll(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData(){
            setLoading(true);

            const komplettUrl = `http://localhost:8080/politiloggen/` + url;

            try{
                const response = await fetch(komplettUrl);   //henter alle NYE meldinger (10 siste)
                const responseData = await response.json();

                if(!response.ok){
                    throw new Error('Failed to load')
                }

                console.log(responseData);
                setData(responseData);
            } catch(error){
                setError({message: error.message || 'Could not fetch!'});
            } finally{
                setLoading(false);
            }
        }

        getData();
    }, [])


  return { data, error, loading };
}
