import MessageList from "./MessageList"


export default function MeldingsWidget(){

    return (
        <div>
            <h1>Siste hendelser</h1>
            <MessageList query="http://localhost:8080/politiloggen/hentTilWidget/horten"/>
        </div>
    )
}