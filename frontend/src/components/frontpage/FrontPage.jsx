import NavBar from "../navbar/navbar"
import MeldingsWidget from "../meldinger/MeldingsWidget"
import VærWidget from "../vær/VærWidget"


export default function FrontPage() {
    return (
        <>
            <NavBar />
            <div className="basis-5/6 p-4 overflow-auto">
                <VærWidget />
            </div>
            <MeldingsWidget />
        </>
    )
    }