import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import MessageList from "./MessageList";
import NavBar from "../navbar/NavBar";
import { Query } from "./MeldingsTyper";
import { checkAuth } from "../../api/helpers";

// MessagePage presenterer all funksjonalitet for søking i Politiloggen. Den viser et søkefelt og en liste med meldinger.
// Hvis det blir gjort et søk, sendes søkeparametrene til MessageList, som henter data fra politiloggen.

// By default, laster MessagePage inn de 10 nyeste meldingene fra politiloggen.

export default function MessagePage() {

    const [query, setQuery] = useState<Query>({url: ""});
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const meldingsSideStil = 'mt-16';

    const buttonStyle = "p-2 px-3 font-mono text-md text-stone-900 bg-stone-300 rounded-md shadow-md";
    const buttonMd = " md:px-3 md:text-xl";
    const buttonLg = " lg:px-4 lg:text-2xl"

    useEffect(() => {
        (async () => {
          const result = await checkAuth();
          setIsLoggedIn(result);

          if(result === false) {
            navigate("/login");
          }
          else{
            setQuery({url: "http://localhost:8080/politiloggen/hentTi"});
          }
        })();
    }, []);

    return (
      <>
        <NavBar />
        <div className={meldingsSideStil}>
            {isLoggedIn === null ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col">
                    <SearchBar setQuery={setQuery} />
                    <MessageList query={query} />
                </div>
            )}
        </div>
      </>
      );
    }