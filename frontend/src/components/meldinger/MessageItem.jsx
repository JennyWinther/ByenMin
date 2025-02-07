
export default function MessageItem({ message }) {
    
    return (
        <div>
            <h3>{message.municipality}, {message.area}</h3>
            <h4>{message.category}</h4>
            <p>{message.text}</p>
        </div>
    )
}