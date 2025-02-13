import MessageList from "./MessageList"


export default function MeldingsWidget(){

    return (
        <div>
            <h1>Siste hendelser</h1>
            <MessageList query="hentTilWidget/horten"/>
        </div>
    )
}