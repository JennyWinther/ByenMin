import { useState, useEffect } from "react";
import useKommuneFetch from "../../api/KommuneFetch";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
        
        queryStreng = `sok?kategori=${kategori}&distrikt=${distrikt}&kommune=${kommune}&datoFra=${fraStr}&datoTil=${tilStr}`;
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kategori</label>
                    <input
                        type="text"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                    />
                </div>
                
                <div>
                    <label>Distrikt</label>
                    <select name="Distrikt" 
                            value={distrikt}
                            onChange={(e) => setDistrikt(e.target.value)}>
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
                    <label>Kommune</label>
                    <select value={kommune}
                            onChange={(e) => setKommune(e.target.value)}>
                        
                        <option value=""></option>
                        {kommuner.map((komm) => (
                        <option key={komm.kommunenummer} value={komm.kommunenavn}>
                            {komm.kommunenavnNorsk}
                        </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Dato fra</label>
                    {/* <input
                        type="text"
                        value={datoFra}
                        onChange={(e) => setDatoFra(e.target.value)}
                    /> */}
                    <DatePicker 
                        disableFuture={true}
                        value={datoFra}
                        onChange={(newValue) => setDatoFra(newValue)}
                    />
                </div>

                <div>
                    <label>Dato til</label>
                    {/* <input
                        type="text"
                        value={datoTil}
                        onChange={(e) => setDatoTil(e.target.value)}
                    /> */}
                    <DatePicker 
                        disableFuture={true}
                        value={datoTil}
                        onChange={(newValue) => setDatoTil(newValue)}
                    />
                </div>
                <input type="submit" />
                <button onClick={handleReset}>Nullstill</button>
            </form>
        </>
    )
}