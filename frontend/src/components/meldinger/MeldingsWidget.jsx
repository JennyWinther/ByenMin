import MessageList from "./MessageList"


export default function MeldingsWidget(){

    return (
        <div className="mt-5">
            <h1 className="font-mono text-3xl text-stone-600">Siste hendelser</h1>
            <MessageList query="http://localhost:8080/politiloggen/hentTilWidget/horten"/>
        </div>
    )
}