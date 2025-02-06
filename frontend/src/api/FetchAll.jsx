
//hente alle meldinger fra databasen 
import { useEffect, useState } from "react";

export default function FetchAll() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);               //okey så. cors headers er ikke lov for å hente fra API. ergo, 
                                                            // jeg må lage en backend som henter dataen og sender den til frontend.

    useEffect(() => {
        async function getData(){
            setLoading(true);

            try{
                const response = await fetch(`https://api.politiet.no/politiloggen/v1/messages?SortBy=Date`);   //henter alle meldinger, sortert på nyest først
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
