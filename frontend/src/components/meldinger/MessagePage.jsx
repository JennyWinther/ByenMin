import { useState } from "react";
import SearchBar from "./SearchBar";
import MessageList from "./MessageList";
import NavBar from "../navbar/navbar";
// MessagePage presenterer all funksjonalitet for søking i Politiloggen. Den viser et søkefelt og en liste med meldinger.
// Hvis det blir gjort et søk, sendes søkeparametrene til MessageList, som henter data fra politiloggen.

// By default, laster MessagePage inn de 10 nyeste meldingene fra politiloggen.

export default function MessagePage() {
    const [query, setQuery] = useState("hentTi");

    return (
        <div className='flex flex-row size-fit h-[100vh]'>
            <NavBar />
            <div className="basis-5/6 p-4 overflow-auto">
                <SearchBar setQuery={setQuery} />
                <MessageList query={query} />
            </div>
        </div>
    )
    }