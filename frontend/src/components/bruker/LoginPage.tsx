import Navbar from "../navbar/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router";
import { hentCsrfTokenFraHeader } from "../../api/helpers";
import { useCsrfContext } from "../../api/CsrfContext";

// Login side for brukeren.
// Brukeren kan logge inn med brukernavn og passord, eller med Google OAuth2.

export default function LoginPage(){
    const [brukernavn, setBrukernavn] = useState<string>("");
    const [passord, setPassord] = useState<string>("");
    const [result, setResult] = useState<boolean | undefined>(undefined);
    const csrfContext = useCsrfContext();


    const navigate = useNavigate();

    function handleOK(){
        setResult(undefined);
        navigate("/");
    }

    let resultStyle;

    function findResult(){
        if(result === true || result === undefined){
            resultStyle = "p-1 my-1 rounded-md shadow-lg";
            return resultStyle;
        }
        else{
            resultStyle = "p-1 my-1 bg-red-200 rounded-md shadow-lg transition-colors duration-500 bg-red-200 animate-fade text-center";
            return resultStyle;    
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            
            const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRF-TOKEN": csrfContext.csrfToken ?? ""
                },
                credentials: "include",
                body: new URLSearchParams({
                        username: brukernavn,
                        password: passord
                    }).toString()
            });

            const nyCsrfToken = hentCsrfTokenFraHeader(csrfContext, response);
            csrfContext.updateCsrfToken(nyCsrfToken);

            console.log(response);
            if (!response.ok) {
                setResult(false);
                findResult();
                throw new Error("Failed to log in user");
            }

            console.log("User logged in successfully!");
            setResult(true);
            findResult();
            handleOK();
        }
        catch(error){
            console.error("Error during login");
            setResult(false);
            findResult();
        };
    };

    
    const buttonStyle = "m-2 p-2 w-52 font-mono text-nowrap text-xs text-stone-900 bg-stone-200 rounded-md shadow-lg text-center";

    

    return(
        <div className="flex flex-col items-center mt-20 min-h-screen">
            <Navbar />
            <section className="min-w-96 flex flex-col items-center">
                <div className="w-80 flex flex-col justify-center bg-stone-200 p-2 rounded-md shadow-lg">
                    <h1 className="text-xl mb-2 text-center">Logg inn</h1>

                    <form onSubmit={handleSubmit} className="bg-stone-100 p-5 rounded-md shadow-lg flex flex-col justify-around">
                        <label htmlFor="brukernavn">Brukernavn</label>
                        <input 
                            type="text" 
                            id="brukernavn" 
                            name="brukernavn"
                            onChange={(e) => setBrukernavn(e.target.value)} 
                            className={resultStyle}
                            />


                        <label htmlFor="passord">Passord</label>
                        <input 
                            type="password" 
                            id="passord" 
                            name="passord"
                            onChange={(e) => setPassord(e.target.value)} 
                            className={resultStyle}
                            />

                        <button className={buttonStyle} type="submit">Logg inn</button>
                    </form>
                </div>
            </section>
            <section className="flex flex-col items-center mt-10">
                <a 
                    className={buttonStyle}
                    href={`${import.meta.env.VITE_API_BACKEND_URL}/oauth2/authorization/google`}>Google Login</a>
                <a 
                    className={buttonStyle}
                    href={`${import.meta.env.VITE_FRONTEND_URL}/registrer`}>Registrer ny bruker</a>
            </section>
            
        </div>
    )
}