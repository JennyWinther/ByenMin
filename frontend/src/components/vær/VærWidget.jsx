
//geoapify for å finne lat/long, sender videre til met/yr api for værmelding

export default function VærWidget(){

    //importere værdata
    //displaye det i table med ikoner fra assets
    //lage en måte å dedusere snø/sludd/etc på. for bilder

    //table structure:
    // headers: 
    // TID - VÆR - TEMP - NEDBØR - VIND - VINDBESKRIVELSE  ---- https://snl.no/Beauforts_vindskala
    return (
        <div>
            {/* <table className="border">
                <tr>
                    <td>Tid</td>
                    <td>Vær</td>
                    <td>Temp.</td>
                    <td>Nedbør, mm</td>
                    <td>Vind m/s</td>
                    <td>Vindbeskrivelse</td>
                </tr>
                <tr>
                    HER GÅR INFO
                </tr>
            </table> */}
        </div>
    )
}