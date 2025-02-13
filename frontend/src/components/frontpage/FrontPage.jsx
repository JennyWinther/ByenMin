import NavBar from "../navbar/navbar"
import MeldingsWidget from "../meldinger/MeldingsWidget"


export default function FrontPage() {
    return (
        <>
            <NavBar />
            <div className="basis-5/6 p-4 overflow-auto">
                Dette er front page
            </div>
            <MeldingsWidget></MeldingsWidget>
        </>
    )
    }