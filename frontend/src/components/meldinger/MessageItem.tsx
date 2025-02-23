import { ParseDateFromUTCToLocal } from "../../api/helpers";
import { Melding } from "./MeldingsTyper";

// MessageItem viser en enkelt melding fra politiloggen. Denne komponenten brukes av MessagePage for å vise en liste med meldinger.
// Dato blir omdannet fra UTC til lokal tid ved hjelp av ParseDateFromUTCToLocal funksjonen.

interface itemProps {
    melding: Melding;
}

export function MessageItem({melding} : itemProps) {

    const date = ParseDateFromUTCToLocal(melding.createdOn);
    const areaEmpty = melding.area === "" ? "" : ", " + melding.area;

    const subTitleStil = "font-sans text-xs text-stone-400 pl-2";
    const subTitleStilMd = "md:text-base";
    const subTitleStilLg = "lg:text-lg";

    const beskrivelsesStil = "pl-2 pt-2 border-l-stone-400 border-l-[1px] text-pretty text-sm ";
    const beskrivelseMd = "md:text-base"
    
    return (
        <div className="bg-neutral-50 rounded-lg shadow p-4 lg:p-8 m-2 lg:m-5">
            <div className="pb-2">
                <h3 className="font-mono text-pretty text-base md:text-lg text-stone-500">{melding.municipality}{areaEmpty}</h3>
                <h4 className={subTitleStil + subTitleStilMd + subTitleStilLg}>{melding.district}</h4>
                <h4 className={subTitleStil + subTitleStilMd + subTitleStilLg}>{date}</h4>
                <h4 className={subTitleStil + subTitleStilMd + subTitleStilLg}>{melding.category}</h4>
            </div>
            <div className="pl-2 py-3 border-t-[1px] border-dashed w-[85%]">
                <p className={beskrivelsesStil + beskrivelseMd}>{melding.text}</p>
            </div>
        </div>
    )
}