import MessageList from "./MessageList"
import { useEffect, useState } from "react";
import { hentBrukerInfo, checkAuth } from "../../api/helpers";

// Widget som henter inn 5 nyeste meldinger fra politiloggen. Vises på forsiden av appen.
// Henter kommune fra brukerinfo, og sender dette til backend for å hente meldinger fra politiloggen.
// Hvis bruker ikke er logget inn, hentes meldinger fra Oslo kommune.

export default function MeldingsWidget(){

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [brukerInfo, setBrukerInfo] = useState<any | null>(null);
    const [URL, setURL] = useState<string | null>(null);

    useEffect(() => {
        async function authInit(){
            const result = await checkAuth();
            setIsLoggedIn(result);
    
            if (result) {
                try {
                    let bruker = await hentBrukerInfo();
                    setBrukerInfo(bruker);
                    
                    if (bruker && bruker.hjemkommune) {
                        setURL(`${import.meta.env.VITE_API_BACKEND_URL}/politiloggen/hentTilWidget/` + bruker.hjemkommune);
                    } else {
                        setURL(`${import.meta.env.VITE_API_BACKEND_URL}/politiloggen/hentTilWidget/oslo`);
                    }
                } catch (error) {
                    setURL(`${import.meta.env.VITE_API_BACKEND_URL}/politiloggen/hentTilWidget/oslo`);
                }
            } else {
                setURL(`${import.meta.env.VITE_API_BACKEND_URL}/politiloggen/hentTilWidget/oslo`);
            }
        };

        authInit();
    }, []);

    const headlineStil = "font-sans text-xl text-center mt-3 underline text-stone-700 decoration-stone-600 decoration-from-font underline-offset-2";
    const headlineMd = " md:text-2xl";
    const headlineLg = " lg:text-2xl"

    if (isLoggedIn === null || URL === null) {
        return <p>Laster...</p>;
    }

    return (
        <div className="mt-5">
            <h1 className={headlineStil + headlineMd + headlineLg} >Siste Hendelser {brukerInfo ? brukerInfo.hjemkommune : ""}</h1>
            <MessageList query={{
                url: URL
            }}
            />
        </div>
    )
}