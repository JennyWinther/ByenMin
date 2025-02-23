import { MessageItem } from "./MessageItem";
import { Melding, Query } from "./MeldingsTyper";
import { useFetch } from "../../api/Fetch";
import { LoginKnapp } from "../navbar/LoginKnapp";
import { checkAuth } from "../../api/helpers";

// Komponenten bruker Fetch-komponenten for å hente data fra egen REST-API, som deretter henter fra politiets API. (Se Fetch.jsx)
// Query kommer fra parent-komponent MessagePage, som fungerer som mellomledd mellom søkefeltet og denne komponenten. (SearchBar genererer query ved brukerinput)
// I bruk på forsiden, får den inn en relativt statisk querystreng som inneholder valgt kommune. 
interface itemProps {
    query: Query;
}


export default function MessageList({query}: itemProps) {    
    const {data: meldinger, error, loading} = useFetch(query);
    if(error) return <p>{error}</p>
    if(loading) return <p>Loading...</p>

    if (!meldinger) {
        return <p>No data</p>;
    }

    const meldingsListeStil = "m-3 flex flex-col min-[1030px]:max-w-[50vw]";

    return (
        <div className={meldingsListeStil}>
            <ul>
                {
                    meldinger.map((melding: Melding) => (
                        <MessageItem key={melding.id} melding={melding} />
                    ))
                }
            </ul>
        </div>
    )
}