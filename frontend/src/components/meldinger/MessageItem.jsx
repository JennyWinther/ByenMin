import { ParseDateFromUTCToLocal } from "../../api/helpers"

// MessageItem viser en enkelt melding fra politiloggen. Denne komponenten brukes av MessagePage for å vise en liste med meldinger.
// Dato blir omdannet fra UTC til lokal tid ved hjelp av ParseDateFromUTCToLocal funksjonen.

export default function MessageItem({ message }) {

    const date = ParseDateFromUTCToLocal(message.createdOn);
    const areaEmpty = message.area === "" ? "" : ", " + message.area;
    
    return (
        <div>
            <h3>{message.municipality}{areaEmpty}</h3>
            <h4>Politidistrikt: {message.district}</h4>
            <h4>{date}</h4>
            <h4>{message.category}</h4>
            <p>{message.text}</p>
        </div>
    )
}