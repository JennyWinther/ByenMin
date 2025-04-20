import { useEffect, useState } from "react";
import { checkAuth, hentCsrfTokenFraHeader } from "./helpers";
import { Vær } from "../components/vær/VærTyper";
import { Query } from "../components/meldinger/MeldingsTyper";
import { useCsrfContext } from "./CsrfContext";


export function useFetch(url: Query) {
    const [data, setData] = useState<Vær[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const csrfContext = useCsrfContext();

    useEffect(() => {
        if (url.url === "" || url.url === null || url.url === undefined) return;
        async function getData(){
            setLoading(true);

            if(!checkAuth(csrfContext)){ 
                setError("IkkeLoggetInn");
                setLoading(false);
                return;
            }

            try{
                const response = await fetch(url.url, {
                    method: 'GET',
                    credentials: 'include'
                });

                const nyCsrfToken = hentCsrfTokenFraHeader(csrfContext, response);
                csrfContext.updateCsrfToken(nyCsrfToken);

                const responseData = await response.json();
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
    }, [url.url])

  return { data, error, loading };
}