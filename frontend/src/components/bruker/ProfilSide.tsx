import { useEffect, useState } from "react";
import { checkAuth, hentBrukerInfo,  } from "../../api/helpers";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/NavBar";
import { BrukerInfo } from "./BrukerTyper";
import { useKommuneFetch } from "../../api/KommuneFetch";
import { Kommune } from "../meldinger/KommuneTyper";
import { useCsrfContext } from "../../api/CsrfContext";
import { fail } from "assert";

// Side for å vise og oppdatere brukerens hjemkommune, samt generell brukerinfo.
// Hjemkommune brukes til å vise værdata og politiloggen på forsiden av appen.

export default function ProfilSide(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [brukerInfo, setBrukerInfo] = useState<BrukerInfo | null>(null);
    const [kommune, setKommune] = useState<string>("");
    const [vellykketEndring, setVellykketEndring] = useState<boolean | null>(null);

    const csrfContext = useCsrfContext();
    const {data: kommuner, error, loading} = useKommuneFetch();

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const result = await checkAuth(csrfContext);
            setIsLoggedIn(result);

            let bruker = await hentBrukerInfo(csrfContext);
            setBrukerInfo(bruker)

            if (bruker?.hjemkommune) {
                setKommune(bruker.hjemkommune);
            } else {
                setKommune("");
            }
        })();
    }, []);

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/login");
    }}, [isLoggedIn]);
    
    if (isLoggedIn === null) {
        return <p>Laster...</p>;
    }
    
    if(error) return <p>{error}</p>
    if(loading) return <p>Loading...</p>
    if (!kommuner) {
        return <p>No data</p>;
    }
    kommuner.sort((a: Kommune, b: Kommune) => a.kommunenavn.localeCompare(b.kommunenavn));

    const brukernavnMedStorForbokstav = brukerInfo?.brukernavn ? brukerInfo.brukernavn.charAt(0).toUpperCase() + brukerInfo.brukernavn.slice(1) : "";

    function handleOK(){
        setVellykketEndring(null);
        navigate("/");
    }

    // Funksjoner for å håndtere endringer i input-felt og sende data til backend
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("handleSubmit")
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/oppdaterHjemKommune/` + kommune, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfContext.csrfToken ?? ""
                },
            });

            if(response && response.ok) {
                setKommune(kommune); // Oppdaterer kommune i state
                setVellykketEndring(true);
            }
            
        } catch(error){
            setVellykketEndring(false);
        }
    }

    // Stiler 
    const vindusStil = "mt-20 flex flex-col items-center justify-center";
    const formStil = "flex flex-col bg-stone-50 rounded-lg shadow-md p-5 m-5 border-[1px] border-stone-300";
    const overskriftStil = "text-3xl text-stone-700 mb-4 w-full border-b-[1px] border-stone-300"
    const cardStil = "block text-pretty bg-white rounded-md shadow-sm p-3 m-2 border-[1px] border-stone-300";
    const labelStil = "text-lg font-semibold border-b-[1px] border-stone-300 mr-2 mb-2";
    const selectStil = "border border-stone-400 rounded-md p-2 max-w-42 m-1";

    const successStil = "absolute top-[20%] flex flex-col items-center text-center justify-center bg-white border-4 border-green-500 rounded-md shadow-lg p-5 m-5";
    const failStil = "absolute top-[20%] max-w-96 flex flex-col items-center text-center justify-center bg-white border-4 border-red-300 rounded-md shadow-lg p-5 m-5";

    return (
        <div>
            <Navbar />
            <div className={vindusStil}>
                {isLoggedIn ? (
                    <div className="flex justify-center">
                        <div className={vellykketEndring ? successStil : "hidden"}>
                            <h1 className="text-pretty text-xl p-2 text-green-900">Ny hjemkommune registrert!</h1>
                            <button onClick={handleOK}
                                className="m-2 p-2 w-36 text-green-900 bg-stone-100 rounded-md shadow-md "
                            >OK</button>
                        </div>

                        {vellykketEndring === false && (
                            <div className={failStil}>
                                <h1 className="text-pretty text-xl p-2 text-red-900 ">Kunne ikke registrere hjemkommune!</h1>
                                <button onClick={handleOK}
                                    className="m-2 p-2 w-36 text-red-900 bg-stone-100 rounded-md shadow-md "
                                >OK</button>
                            </div>
                        )}
                        

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
                    </div>
                ) : (
                    <h1>Ingen brukerdata tilgjengelig</h1>
                )}
                
            </div>
        </div>
        
    )
}