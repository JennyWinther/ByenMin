import { useState } from "react";

// SearchBar er et søkefelt som tar inn søkeparametre fra brukeren. Når brukeren trykker på søk, sendes disse parametrene til MessagePage, 
// som igjen sender dem til MessageList for å hente data fra politiloggen.

export default function SearchBar({setQuery}) {
    let queryStreng = "";

    const [kategori, setKategori] = useState("");
    const [distrikt, setDistrikt] = useState("");
    const [kommune, setKommune] = useState("");
    const [datoFra, setDatoFra] = useState("");
    const [datoTil, setDatoTil] = useState("");

    //Kompilerer Query string basert på brukerinput. Da API ikke bryr seg om tomme felter, trenger vi ikke å sjekke om feltene er tomme.
    function handleSubmit(e){ 
        e.preventDefault();
        
        queryStreng = ("sok?kategori=" + kategori + "&distrikt=" + distrikt + "&kommune=" + kommune + "&datoFra=" + datoFra + "&datoTil=" + datoTil);
        setQuery(() => {
            return queryStreng;
        });
    }

    //Nullstiller alle feltene i søkefeltet.
    function handleReset() {
        setKategori("");
        setDistrikt("");
        setKommune("");
        setDatoFra("");
        setDatoTil("");
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
                    <input
                        type="text"
                        value={distrikt}
                        onChange={(e) => setDistrikt(e.target.value)}
                    />
                </div>

                <div>
                    <label>Kommune</label>
                    <input
                        type="text"
                        value={kommune}
                        onChange={(e) => setKommune(e.target.value)}
                    />
                </div>

                <div>
                    <label>Dato fra</label>
                    <input
                        type="text"
                        value={datoFra}
                        onChange={(e) => setDatoFra(e.target.value)}
                    />
                </div>

                <div>
                    <label>Dato til</label>
                    <input
                        type="text"
                        value={datoTil}
                        onChange={(e) => setDatoTil(e.target.value)}
                    />
                </div>
                <input type="submit" />
                <button onClick={handleReset}>Nullstill</button>
            </form>
        </>
    )
}