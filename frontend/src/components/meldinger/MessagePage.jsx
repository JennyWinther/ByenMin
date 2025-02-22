import { useState } from "react";
import SearchBar from "./SearchBar";
import MessageList from "./MessageList";
import NavBar from "../navbar/navbar";
// MessagePage presenterer all funksjonalitet for søking i Politiloggen. Den viser et søkefelt og en liste med meldinger.
// Hvis det blir gjort et søk, sendes søkeparametrene til MessageList, som henter data fra politiloggen.

// By default, laster MessagePage inn de 10 nyeste meldingene fra politiloggen.

export default function MessagePage() {
    const [query, setQuery] = useState("http://localhost:8080/politiloggen/hentTi");

    const meldingsSideStil = 'mt-16';

    return (
        <>
            <NavBar />
            <div className={meldingsSideStil}>
                <div>
                    <SearchBar setQuery={setQuery} />
                    <MessageList query={query} />
                </div>
            </div>
        </>
        
    )
    }