import { useEffect, useState } from "react";
import { checkAuth } from "./helpers";

// Fetch komponenten henter data fra egen REST-API, som igjen henter data fra politiets API.
// Komponenten tar inn en URL som parameter, og henter data fra dette endepunktet. Dette er gjort for å 
// holde metode (hook) relativt gjenbrukbar, og omgå CORS-problematikk.

// Hver komponent er anvarlig for å gi riktig URL til endepunkt.

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;
        async function getData(){
            setLoading(true);
            if(!checkAuth){ return;}
            try{
                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include'
                });
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error('Failed to load')
                }
                setData(responseData);
            } catch(error){
                setError({message: error.message || 'Could not fetch!'});
            } finally{
                setLoading(false);
            }
        }
        getData();
        console.log(getData());
    }, [url])

  return { data, error, loading };
}