import { useEffect, useState } from "react";
import { useKommuneFetch } from "../../api/KommuneFetch";
import { Query } from "./MeldingsTyper";
import { Kommune } from "./KommuneTyper";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { checkAuth } from "../../api/helpers";
import { useNavigate } from "react-router-dom";

// SearchBar er et søkefelt som tar inn søkeparametre fra brukeren. Når brukeren trykker på søk, sendes disse parametrene til MessagePage, 
// som igjen sender dem til MessageList for å hente data fra politiloggen.
// Kan bare brukes hvis bruker er logget inn. Hvis ikke, sendes brukeren til login-siden.

interface itemProps {
    setQuery: React.Dispatch<React.SetStateAction<Query>>;
}

export default function SearchBar({setQuery}: itemProps) {
    let queryStreng = "";

    const [kategori, setKategori] = useState<string>("");
    const [distrikt, setDistrikt] = useState<string>("");
    const [kommune, setKommune] = useState<string>("");
    const [datoFra, setDatoFra] = useState<Dayjs | null>(null);
    const [datoTil, setDatoTil] = useState<Dayjs | null>(null);
    const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        
        async function authInit() {
            setIsLoading(true);
            const result = await checkAuth();
            if (!result) {
                navigate("/login");
            }
            else if( result === null){
                return <>
                    <p>Laster...</p>;
                </>;
            }
        };
        authInit();
        setIsLoading(false);
    }, []);

    const {data: kommuner, error, loading} = useKommuneFetch();
    if(error) return <p>{error}</p>
    if(loading) return <p>Loading...</p>
    if (!kommuner) {
        return <p>No data</p>;
    }

    
    if (isLoading) {
        return <p>Laster...</p>;
    }

    //Sorterer kommunene alfabetisk
    kommuner.sort((a: Kommune, b: Kommune) => a.kommunenavn.localeCompare(b.kommunenavn));

    //Kompilerer Query string basert på brukerinput. Da API ikke bryr seg om tomme felter, trenger vi ikke å sjekke om feltene er tomme.
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){ 
        e.preventDefault();

        // Field validation for kategori, da det er fri input. Regex for å forby tall. 
        if(!/^[a-zA-ZæøåÆØÅ\s]*$/.test(kategori)){
            alert("Kategori kan bare bestå av bokstaver og mellomrom.");
            return;
        }

        const fraStr = datoFra ? datoFra.format('YYYY-MM-DD') : "";
        const tilStr = datoTil ? datoTil.format('YYYY-MM-DD') : "";
        
        queryStreng = `${process.env.API_BACKEND_URL}/politiloggen/sok?kategori=${kategori}&distrikt=${distrikt}&kommune=${kommune}&datoFra=${fraStr}&datoTil=${tilStr}`;
        setQuery(() => {
            return {
                url: queryStreng
            }
        });
    }

    //Nullstiller alle feltene i søkefeltet.
    function handleReset() {
        setKategori("");
        setDistrikt("");
        setKommune("");
        setDatoFra(null);
        setDatoTil(null);
    }

    function handleToggleSearchBar() {
        setSearchBarVisible(prev => !prev);
    }

    const labelStyle = "font-mono text-sm text-stone-500 md:text-base block";
    const inputStyle = "border border-stone-400 rounded-md p-2 py-4 max-w-42 m-1";
    const datePickerStyle = "border border-stone-400 rounded-lg m-1";
    const buttonStyle = "bg-stone-50 border px-2 py-1 rounded-md shadow-sm m-1 hover:bg-stone-100";

    let searchBarStyle = "hidden"
    let searchButtonStyle = "w-[95vw] text-lg bg-neutral-50 rounded-md shadow-sm p-1 mt-2 self-center"

    return (
        <div className="flex flex-col">
            <button
                className={searchButtonStyle}
                onClick={handleToggleSearchBar}
            >
                {searchBarVisible ? "Lukk søk" : "Søk"}
            </button>

            <section 
                className={searchBarVisible ? "" : searchBarStyle}
            >
                <form onSubmit={handleSubmit}
                        className="flex flex-wrap place-content-around place-self-center mt-2 p-2 shadow-md rounded-lg lg:flex-row max-w-[95vw] bg-stone-50"
                        >
                        <div>
                            <label className={labelStyle}>Kategori</label>
                            <input
                                type="text"
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                                className={inputStyle}
                            />
                        </div>
                        
                        <div>
                            <label className={labelStyle}>Distrikt</label>
                            <select name="Distrikt" 
                                    value={distrikt}
                                    onChange={(e) => setDistrikt(e.target.value)}
                                    className={inputStyle}                        
                                >        
                                <option value="">Velg politidistrikt</option>
                                <option value="Oslo">Oslo Politidistrikt</option>
                                <option value="Øst">Øst Politidistrikt</option>
                                <option value="Innlandet">Innlandet Politidistrikt</option>
                                <option value="SørØst">Sør-Øst Politidistrikt</option>
                                <option value="Agder">Agder Politidistrikt</option>
                                <option value="SørVest">Sør-Vest Politidistrikt</option>
                                <option value="Vest">Vest Politidistrikt</option>
                                <option value="MøreOgRomsdal">Møre og Romsdal Politidistrikt</option>
                                <option value="Trøndelag">Trøndelag Politidistrikt</option>
                                <option value="Nordland">Nordland Politidistrikt</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelStyle}>Kommune</label>
                            <select value={kommune}
                                    onChange={(e) => setKommune(e.target.value)}
                                    className={inputStyle}>
                                
                                <option value="">Velg kommune</option>
                                {kommuner.map((komm: Kommune) => (
                                <option key={komm.kommunenummer} value={komm.kommunenavn}>
                                    {komm.kommunenavnNorsk}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelStyle}>Dato fra</label>
                            <DatePicker 
                                disableFuture={true}
                                value={datoFra}
                                onChange={(newValue) => setDatoFra(newValue)}
                                className={datePickerStyle}
                            />
                        </div>

                        <div>
                            <label className={labelStyle}>Dato til</label>
                            <DatePicker 
                                disableFuture={true}
                                value={datoTil}
                                onChange={(newValue) => setDatoTil(newValue)}
                                className={datePickerStyle}
                            />
                        </div>

                        <div className="w-full flex justify-center mt-2">
                            <input type="submit" 
                                    className={buttonStyle} />
                            <button onClick={handleReset}
                                    className={buttonStyle}
                                >Nullstill</button>
                        </div>
                    </form>
            </section>
            
        </div>
    )
}