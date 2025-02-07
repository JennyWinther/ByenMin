
// MessageItem viser en enkelt melding fra politiloggen. Denne komponenten brukes av MessagePage for å vise en liste med meldinger.

export default function MessageItem({ message }) {
    
    return (
        <div>
            <h3>{message.municipality}, {message.area}</h3>
            <h4>{message.category}</h4>
            <p>{message.text}</p>
        </div>
    )
}