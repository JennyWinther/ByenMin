
export default function SearchBar() {
    const [kategori, setKategori] = useState("");
    const [distrikt, setDistrikt] = useState("");
    const [kommune, setKommune] = useState("");
    const [datoFra, setDatoFra] = useState("");
    const [datoTil, setDatoTil] = useState("");

    

    return (
        <>
            <label>Kategori</label>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <label>Distrikt</label>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <label>Kommune</label>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <label>Dato fra</label>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <label>Dato til</label>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </>
        
    )
}