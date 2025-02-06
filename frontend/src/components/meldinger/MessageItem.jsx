
export default function MessageItem({ message }) {
    return (
        <div>
            <h2>{message.title}</h2>
            <p>{message.content}</p>
        </div>
    )
}