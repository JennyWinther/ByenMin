
export default function SearchBar({setSearchTerm}) {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
            <label>Distrikt</label>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </>
        
    )
}