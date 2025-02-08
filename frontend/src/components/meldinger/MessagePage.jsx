import Fetch from "../../api/Fetch"
import MessageItem from "./MessageItem";
import SearchBar from "./SearchBar";

// MessagePage inneholder all funksjonalitet rundt meldinger fra Politiloggen. Komponenten inneholder liste med meldinger,
// samt mulighet for å filtrere meldinger basert på kategori, distrikt, kommune og dato.
// Komponenten bruker Fetch-komponenten for å hente data fra egen REST-API, som deretter henter fra politiets API. (Se Fetch.jsx)

export default function MessagePage() {

    const {data: messages, error, loading} = Fetch("hentTi");
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>{error.message}</p>
    }

    return (
        <div>

            <h1>Nyeste meldinger</h1>
            <SearchBar />

            <ul>
                {messages.map(message => (
                        <MessageItem key={message.id} message={message} />
                ))}
            </ul>
        </div>
    )
    }