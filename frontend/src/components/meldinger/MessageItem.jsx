import { ParseDateFromUTCToLocal } from "../../api/helpers"

// MessageItem viser en enkelt melding fra politiloggen. Denne komponenten brukes av MessagePage for å vise en liste med meldinger.
// Dato blir omdannet fra UTC til lokal tid ved hjelp av ParseDateFromUTCToLocal funksjonen.

export default function MessageItem({ message }) {

    const date = ParseDateFromUTCToLocal(message.createdOn);
    const areaEmpty = message.area === "" ? "" : ", " + message.area;

    const subTitleStyle = "font-sans text-sm text-stone-400 pl-2";
    
    return (
        <div className="bg-neutral-50 rounded-lg shadow p-4 m-4 pl-8">
            <div className="pb-2">
                <h3 className="font-mono text-pretty text-lg text-stone-500">{message.municipality}{areaEmpty}</h3>
                <h4 className={subTitleStyle}>{message.district}</h4>
                <h4 className={subTitleStyle}>{date}</h4>
                <h4 className={subTitleStyle}>{message.category}</h4>
            </div>
            <div className="pl-2 py-3 border-t-[1px] border-dashed w-[85%]">
                <p className="pl-2 pt-2 border-l-stone-400 border-l-[1px] text-pretty">{message.text}</p>
            </div>
        </div>
    )
}