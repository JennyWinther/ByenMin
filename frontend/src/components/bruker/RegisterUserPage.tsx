import { useState } from "react";
import { registerUser } from "../../api/helpers";
import { useNavigate } from "react-router";
import Navbar from "../navbar/NavBar";
import { useCsrfContext } from "../../api/CsrfContext";

// Side for å registrere ny bruker.
// Bruker kan registrere seg med brukernavn, passord og epost. Passord må gjentas for å unngå skrivefeil.

export default function RegisterUserPage(){
    const [brukernavn, setBrukernavn] = useState<string>("");
    const [passord, setPassord] = useState<string>("");
    const [passordGjenta, setPassordGjenta] = useState<string>("");
    const [epost, setEpost] = useState<string>("");
    const [result, setResult] = useState<boolean | undefined>(undefined);
    const csrfContext = useCsrfContext();

    const navigate = useNavigate();

    const buttonStyle = "m-2 p-2 w-52 font-mono text-nowrap text-xs text-stone-900 bg-stone-200 rounded-md shadow-lg text-center";

    function findResult(){
        if(result === true){
            return (
                <div className="absolute top-[20%] flex flex-col items-center justify-center bg-lime-200 rounded-md shadow-lg p-5 m-5">
                    <h1 className="text-pretty text-xl p-2 text-lime-900">Bruker registrert!</h1>
                    <button onClick={handleOK}
                    className="m-2 p-2 w-36 text-lime-900 bg-lime-100 rounded-md shadow-md "
                    >OK</button>
                </div>
            )
        }else if(result === false){
            return (
                <div className="absolute top-[20%] max-w-96 flex flex-col items-center justify-center bg-red-200 rounded-md shadow-lg p-5 m-5">
                    <h1 className="text-pretty text-xl p-2 text-red-900 ">Kunne ikke registrere bruker!</h1>
                    <button onClick={handleOK}
                        className="m-2 p-2 w-36 text-red-900 bg-red-100 rounded-md shadow-md "
                    >OK</button>
                </div>
            )
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault(); 
        if(passord !== passordGjenta){
            alert("Passordene er ikke like.");
            return;
        }
        
        const data = {
            brukernavn: brukernavn,
            passord: passord,
            email: epost
        }

        try{
            const response = await registerUser(csrfContext, data);
            setResult(response);
        } catch (error){
            console.error("Error during registration:", error);
            setResult(false);
        }

        console.log(result);
    }

    function handleOK(){
        setResult(undefined);
        navigate("/login");
    }

    return (
        <div className="flex flex-col items-center h-screen">
            <Navbar />

            {findResult()}

            <div className="mt-20 w-80 flex flex-col justify-start bg-stone-200 p-5 rounded-md shadow-lg">

                <h1 className="text-xl m-3">Registrer bruker</h1>

                <form onSubmit={handleSubmit}
                    className="bg-stone-100 p-5 rounded-md shadow-lg flex flex-col">
                        
                    <label>Brukernavn:</label>
                    <input type="text" 
                        value={brukernavn} 
                        onChange={(e) => setBrukernavn(e.target.value)}
                        className="p-1 m-1 rounded-md shadow-md bg-white"
                    />

                    <label>Passord:</label>
                    <input type="password" 
                        value={passord} 
                        onChange={(e) => setPassord(e.target.value)}
                        className="p-1 m-1 rounded-md shadow-md bg-white" 
                        />

                    <label>Gjenta passord:</label>
                    <input type="password" 
                        value={passordGjenta} 
                        onChange={(e) => setPassordGjenta(e.target.value)}
                        className="p-1 m-1 rounded-md shadow-md bg-white"
                     />

                    <label>Epost:</label>
                    <input type="email" 
                        value={epost} 
                        onChange={(e) => setEpost(e.target.value)}
                        className="p-1 m-1 rounded-md shadow-md bg-white"
                        />

                    <button type="submit"
                        className="m-2 p-2 w-36 font-mono text-nowrap text-xs text-stone-900 bg-stone-200 rounded-md shadow-md place-self-center"
                    >Registrer</button>
                </form>
            </div>

            <section className="flex flex-col items-center mt-10">
                <a 
                    className={buttonStyle}
                    href={`${import.meta.env.VITE_FRONTEND_URL}/login`}>Logg inn</a>
            </section>
        </div>
    )

}