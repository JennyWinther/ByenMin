
export default function Navbar() { 
    return (
        <div className="p-10 bg-stone-500 basis-1/6 ">
            <h1 className="font-mono text-4xl text-stone-300 pb-5">Min By</h1>
            <ul className="text-stone-200 text-md">
                <li>
                    <a href="http://localhost:5173/">Forside</a>
                </li>
                <li>
                    <a href="http://localhost:5173/politiloggen">Politiloggen</a>
                </li>
            </ul>
        </div>
    )
}