import MessageList from "./MessageList"

//Widget som henter inn 5 nyeste meldinger fra politiloggen. Skal i fremtiden være for valgt by av logget inn profil, ellers hele landet

export default function MeldingsWidget(){
    const headlineStil = "font-sans text-xl text-center mt-3 underline text-stone-700 decoration-stone-600 decoration-from-font underline-offset-2";
    const headlineMd = " md:text-2xl";
    const headlineLg = " lg:text-2xl"

    return (
        <div className="mt-5">
            <h1 className={headlineStil + headlineMd + headlineLg} >Siste Hendelser</h1>
            <MessageList query="http://localhost:8080/politiloggen/hentTilWidget/horten"/>
        </div>
    )
}