import { useState } from "react";
import Fetch from "../../api/Fetch";

export default function SearchBar() {
    const [kategori, setKategori] = useState("");
    const [distrikt, setDistrikt] = useState("");
    const [kommune, setKommune] = useState("");
    const [datoFra, setDatoFra] = useState("");
    const [datoTil, setDatoTil] = useState("");

    function handleSubmit(){ 
        e.preventDefault();
        
        let queryStreng = "sok?kategori=" + kategori + "&distrikt=" + distrikt + "&kommune=" + kommune + "&datoFra=" + datoFra + "&datoTil=" + datoTil;

        Fetch(queryStreng);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kategori</label>
                    <input
                        type="text"
                        onChange={(e) => setKategori(e.target.value)}
                    />
                </div>
                
                <div>
                    <label>Distrikt</label>
                    <input
                        type="text"
                        onChange={(e) => setDistrikt(e.target.value)}
                    />
                </div>

                <div>
                    <label>Kommune</label>
                    <input
                        type="text"
                        onChange={(e) => setKommune(e.target.value)}
                    />
                </div>

                <div>
                    <label>Dato fra</label>
                    <input
                        type="text"
                        onChange={(e) => setDatoFra(e.target.value)}
                    />
                </div>

                <div>
                    <label>Dato til</label>
                    <input
                        type="text"
                        onChange={(e) => setDatoTil(e.target.value)}
                    />
                </div>
                <input type="submit" value="" />
            </form>
        </>
        
    )
}