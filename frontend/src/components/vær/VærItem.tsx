import { Vær } from "./VærTyper";
import { ParseDateFromUTCToLocal } from "../../api/helpers";

interface itemProps {
    værInfo: Vær;
}

//huskeliste: ta hånd om ukjente værikoner

export function VærItem({værInfo} : itemProps) {

    const værsymbol = værInfo.vaerSymbol + ".svg";
    const dato = ParseDateFromUTCToLocal(værInfo.tidspunkt);

    const subTitleStil = "font-sans text-xs text-stone-400 pl-2";
    const subTitleStilMd = "md:text-base";
    const subTitleStilLg = "lg:text-lg";
    
    return (
        <div className="bg-neutral-50 rounded-lg shadow p-4 lg:p-8 m-2 lg:m-5">
            <div className="pb-2">
                <h3 className="font-mono text-pretty text-base md:text-lg text-stone-500">{dato}</h3>
                <h4 className={subTitleStil + subTitleStilMd + subTitleStilLg}>{værInfo.luftTemperatur}</h4>
                <h4 className={subTitleStil + subTitleStilMd + subTitleStilLg}>{værInfo.vindHastighet}</h4>
                <h4 className={subTitleStil + subTitleStilMd + subTitleStilLg}>{værInfo.nedbor}</h4>
                <img src={"/ikonerVær/"+værsymbol} alt="Ikon Vær" /> 
            </div>
        </div>
    )
}
