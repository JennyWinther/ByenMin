import NavBar from "../navbar/NavBar"
import MeldingsWidget from "../meldinger/MeldingsWidget"

// Første siden bruker ser. 

export default function FrontPage() {

    return (
        <>
            <NavBar />
            <div className="mt-16 max-w-[100vw] lg:max-w-[90vw]">
                <MeldingsWidget />
            </div>
            
        </>
    )
    }