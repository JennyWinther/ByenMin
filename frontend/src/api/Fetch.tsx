import { useEffect, useState } from "react";
import { checkAuth, hentCsrfTokenFraHeader } from "./helpers";
import { Melding, Query } from "../components/meldinger/MeldingsTyper";
import { useCsrfContext } from "./CsrfContext";

// Fetch komponenten henter data fra egen REST-API, som igjen henter data fra politiets API.
// Komponenten tar inn en URL som parameter, og henter data fra dette endepunktet. Dette er gjort for å 
// holde metode (hook) relativt gjenbrukbar, og omgå CORS-problematikk.

// Hver komponent er anvarlig for å gi riktig URL til endepunkt.

const useFetch = (url: Query | null) => {
    const [data, setData] = useState<Melding[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const csrfContext = useCsrfContext();

    useEffect(() => {
        if (!url?.url) return;

        const urlToFetch = url.url;

        async function getData(){
            setLoading(true);

            if(!checkAuth){ 
                setError("IkkeLoggetInn");
                setLoading(false);
                return;
            }
            
            try{
                const response = await fetch(urlToFetch, {
                    method: 'GET',
                    credentials: 'include'
                });
                const responseData = await response.json();

                const nyCsrfToken = hentCsrfTokenFraHeader(csrfContext, response);
                csrfContext.updateCsrfToken(nyCsrfToken);

                if(!response.ok){
                    throw new Error('Failed to load')
                }
                setData(responseData);
            } catch(error){
                setError('Could not fetch!');
            } finally{
                setLoading(false);
            }
        }
        getData();
        
    }, [url?.url])

  return { data, error, loading };
}

export default useFetch;