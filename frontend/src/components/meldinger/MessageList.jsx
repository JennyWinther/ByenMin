import MessageItem from "./MessageItem";
import useFetch from "../../api/Fetch";

// Komponenten bruker Fetch-komponenten for å hente data fra egen REST-API, som deretter henter fra politiets API. (Se Fetch.jsx)
// Query kommer fra parent-komponent MessagePage, som fungerer som mellomledd mellom søkefeltet og denne komponenten. (SearchBar genererer query ved brukerinput)
// I bruk på forsiden, får den inn en relativt statisk querystreng som inneholder valgt kommune. 

export default function MessageList({ query }) {
    const {data: messages, error, loading} = useFetch(query);
    if(error) return <p>{error.message}</p>
    if(loading) return <p>Loading...</p>

    return (
        <div className="max-w-3xl flex flex-col flex-wrap">
            <ul>
                {messages.map(message => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </ul>
        </div>
    )
}