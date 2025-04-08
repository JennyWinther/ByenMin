import { MessageItem } from "./MessageItem";
import { Melding, Query } from "./MeldingsTyper";
import useFetch from "../../api/Fetch";

// Komponenten bruker Fetch-komponenten for å hente data fra egen REST-API, som deretter henter fra politiets API. (Se Fetch.jsx)
// Query kommer fra parent-komponent MessagePage, som fungerer som mellomledd mellom søkefeltet og denne komponenten. (SearchBar genererer query ved brukerinput)
// I bruk på forsiden, får den inn en relativt statisk querystreng som inneholder valgt kommune. 

interface itemProps {
    query: Query;
}


export default function MessageList({query}: itemProps) {    
    const {data: meldinger, error, loading} = useFetch(query);
    if(error) return <p>{error}</p>
    if(loading) return <p>Laster...</p>

    const meldingsListeStil = "m-3 flex flex-col min-[1030px]:max-w-[50vw]";

    if (meldinger.length <= 0) {
        return <div className="flex max-w-[60vw] self-center justify-center bg-stone-50 shadow-md rounded-lg border-stone-200 border-[1px] p-3 m-3">
                <p className="">
                    Ingen resultater
                </p>
            </div>;
    }

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