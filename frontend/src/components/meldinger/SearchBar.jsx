import { useState } from "react";
import useKommuneFetch from "../../api/KommuneFetch";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// SearchBar er et søkefelt som tar inn søkeparametre fra brukeren. Når brukeren trykker på søk, sendes disse parametrene til MessagePage, 
// som igjen sender dem til MessageList for å hente data fra politiloggen.

export default function SearchBar({setQuery}) {
    let queryStreng = "";

    const [kategori, setKategori] = useState("");
    const [distrikt, setDistrikt] = useState("");
    const [kommune, setKommune] = useState("");
    const [datoFra, setDatoFra] = useState(null);
    const [datoTil, setDatoTil] = useState(null);

    //Hente inn kommuner ved mounting av komponent
    const {data: kommuner, error, loading} = useKommuneFetch();
    if(error) return <p>{error.message}</p>
    if(loading) return <p>Loading...</p>

    //Sorterer kommunene alfabetisk
    kommuner.sort((a, b) => a.kommunenavn.localeCompare(b.kommunenavn));

    //Kompilerer Query string basert på brukerinput. Da API ikke bryr seg om tomme felter, trenger vi ikke å sjekke om feltene er tomme.
    function handleSubmit(e){ 
        e.preventDefault();

        const fraStr = datoFra ? datoFra.format("YYYY-MM-DD") : "";
        const tilStr = datoTil ? datoTil.format("YYYY-MM-DD") : "";
        
        queryStreng = `http://localhost:8080/politiloggen/sok?kategori=${kategori}&distrikt=${distrikt}&kommune=${kommune}&datoFra=${fraStr}&datoTil=${tilStr}`;
        setQuery(() => {
            return queryStreng;
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

    const labelStyle = "font-mono text-sm text-stone-500";
    const inputStyle = "border border-stone-400 rounded-md p-2 py-4 w-30 m-1";
    const datePickerStyle = "border border-stone-400 rounded-lg m-1";
    const buttonStyle = "bg-stone-50 border px-2 py-1 rounded-md shadow-sm m-1 hover:bg-stone-100";

    return (
        <>
            <form onSubmit={handleSubmit}
                className="flex flex-row gap-2 bg-neutral-50 rounded-lg shadow p-4 m-4 w-3/4"
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
                        {kommuner.map((komm) => (
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
                <div className="flex flex-col justify-center">
                    <input type="submit" 
                            className={buttonStyle} />
                    <button onClick={handleReset}
                            className={buttonStyle}
                        >Nullstill</button>
                </div>
            </form>
        </>
    )
}