// denne skal være for å logge inn. Serves isteden for den basic siden til Spring. 

export default function LoginPage(){
    const buttonStyle = "m-2 p-2 font-mono text-nowrap text-xs text-stone-900 bg-gradient-to-tr from-stone-300 to-stone-400 rounded-md shadow-[2px_6px_0px_0px_rgba(0,_0,_0,_0.3)]";

    return(
        <div>
            <a 
                    className={buttonStyle}
                    href="http://localhost:8080/oauth2/authorization/google">Google Login</a>
                <a 
                    className={buttonStyle}
                    href="">Logg inn / Registrer</a>
        </div>
    )
}