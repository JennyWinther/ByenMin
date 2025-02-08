import { useEffect, useState } from "react";

// Fetch komponenten henter data fra egen REST-API, som igjen henter data fra politiets API.
// Komponenten tar inn en URL som parameter, og henter data fra dette endepunktet. Dette er gjort for å 
// omgå CORS-problematikk.

// Hver komponent er anvarlig for å gi riktig URL til endepunkt.

export default function FetchAll(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData(){
            setLoading(true);

            const komplettUrl = `http://localhost:8080/politiloggen/` + url;

            try{
                const response = await fetch(komplettUrl);
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
