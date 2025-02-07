import Fetch from "../../api/Fetch"
import MessageItem from "./MessageItem";

export default function MessagePage() {

    const {data: messages, error, loading} = Fetch("hentAlle");
    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>{error.message}</p>
    }

    return (
        <div>
            <h1>Nyeste meldinger</h1>

            <ul>
                {messages.map(message => (
                        <MessageItem key={message.id} message={message} />
                ))}
            </ul>
        </div>
    )
    }