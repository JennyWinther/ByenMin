import { useEffect, useState } from "react";
import { checkAuth } from "./helpers";

// Fetch komponenten henter data fra egen REST-API, som igjen henter data fra GeoNorge/Kartverkets API.
// Komponenten tar inn en URL som parameter, og henter data fra dette endepunktet. Dette er gjort for å 
// holde metode (hook) relativt gjenbrukbar, og omgå CORS-problematikk.

// Henter statisk inn en liste over alle kommuner i Norge.
// Omdannes til mer generisk versjon hvis det er behov for fylker eller ytterligere resultater fra API.

export default function useKommuneFetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getData(){
            setLoading(true);
            const url = `http://localhost:8080/kommuner/alle`;
            if(!checkAuth()){
                console.log("Auth is false");
                return { data, error, loading };
            }
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
    }, [])

  return { data, error, loading };
}
