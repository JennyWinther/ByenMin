import { useEffect, useState } from "react";
import { checkAuth, hentBrukerInfo } from "../../api/helpers";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/NavBar";
import { BrukerInfo } from "./BrukerTyper";
import { useKommuneFetch } from "../../api/KommuneFetch";
import { Kommune } from "../meldinger/KommuneTyper";

// Side for å vise og oppdatere brukerens hjemkommune, samt generell brukerinfo.
// Hjemkommune brukes til å vise værdata og politiloggen på forsiden av appen.

export default function ProfilSide(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [brukerInfo, setBrukerInfo] = useState<BrukerInfo | null>(null);
    const [kommune, setKommune] = useState<string>("");
    const navigate = useNavigate();

    // On mount funksjoner ///////
    useEffect(() => {
        (async () => {
            const result = await checkAuth();
            setIsLoggedIn(result);

            let bruker = await hentBrukerInfo();
            setBrukerInfo(bruker)

            if (bruker.hjemkommune) {
                setKommune(bruker.hjemkommune);
            } else {
                setKommune(""); // Sett en tom streng som default
            }
        })();
    }, []);

    if (!isLoggedIn) {
        navigate("/login");
    }

    // Hent kommune-data fra backend
    const {data: kommuner, error, loading} = useKommuneFetch();
    if(error) return <p>{error}</p>
    if(loading) return <p>Loading...</p>
    if (!kommuner) {
        return <p>No data</p>;
    }
    kommuner.sort((a: Kommune, b: Kommune) => a.kommunenavn.localeCompare(b.kommunenavn));

    const brukernavnMedStorForbokstav = brukerInfo?.brukernavn ? brukerInfo.brukernavn.charAt(0).toUpperCase() + brukerInfo.brukernavn.slice(1) : "";

    // Funksjoner for å håndtere endringer i input-felt og sende data til backend

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/bruker/oppdaterHjemKommune/" + kommune, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(response && response.ok) {
                alert("Hjemkommune oppdatert til: " + kommune);
                setKommune(kommune); // Oppdaterer kommune i state
            }
            
        } catch(error){
            console.error("Error updating kommune:", error);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setKommune(e.target.value);
    }

    // Stiler 
    const vindusStil = "mt-20 flex flex-col items-center justify-center";
    const formStil = "flex flex-col bg-stone-50 rounded-lg shadow-md p-5 m-5 border-[1px] border-stone-300";
    const overskriftStil = "text-3xl text-stone-700 mb-4 w-full border-b-[1px] border-stone-300"
    const cardStil = "block text-pretty bg-white rounded-md shadow-sm p-3 m-2 border-[1px] border-stone-300";
    const labelStil = "text-lg font-semibold border-b-[1px] border-stone-300 mr-2 mb-2";
    const selectStil = "border border-stone-400 rounded-md p-2 max-w-42 m-1";

    return (
        <div>
            <Navbar />
            <div className={vindusStil}>
                {isLoggedIn ? (
                    <form className={formStil}
                        onSubmit={handleSubmit}>

                        <h1 className={overskriftStil}>Hei, <b>{brukernavnMedStorForbokstav}</b>!</h1>
                        <h2 className={cardStil}>
                            <label className={labelStil}>
                                Registrert epost: </label> 
                                {brukerInfo?.email}</h2>

                        <div className={cardStil + " mb-5"}>
                            <h2 className={labelStil}>Hjemkommune:</h2>
                            <p className="text-sm text-pretty">Setter sted for Politiloggen på forsiden og for Været.</p>
                            <p className="text-xs text-pretty">Tom hvis ingen kommune er valgt.</p>
                            <div>
                            <select 
                                value={kommune} 
                                onChange={(e) => { setKommune(e.target.value)}}
                                className={selectStil}
                            >
                                <option value="">Velg politidistrikt</option>
                                {kommuner.map((komm: Kommune) => (
                                    <option key={komm.kommunenummer} value={komm.kommunenavn}>
                                        {komm.kommunenavnNorsk}
                                    </option>
                                ))}
                             </select>
                            </div>
                        </div>
                    
                        <button className="bg-white rounded-md shadow-md p-1">Lagre endringer</button>
                    </form>

                ) : (
                    <h1>Ingen brukerdata tilgjengelig</h1>
                )}
                
            </div>
        </div>
        
    )
}