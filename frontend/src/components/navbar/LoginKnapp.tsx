import { useEffect, useState } from "react";
import { checkAuth } from "../../api/helpers";

export function LoginKnapp(){

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const result = await checkAuth();
            setIsLoggedIn(result);
        })();
    }, []);

    const buttonStyle = "absolute top-4 left-4 p-1 px-2 font-mono text-xs text-stone-900 bg-stone-300 rounded-md shadow-md";
    const buttonMd = " md:px-2 md:text-base";
    const buttonLg = " lg:px-3 lg:text-lg"
    
    return (
        <>
            {isLoggedIn ? (
                <div>
                </div>
            ) : (
                <a 
                    className={buttonStyle + buttonMd + buttonLg}
                    href="http://localhost:8080/oauth2/authorization/google">Logg inn
                </a>
            )}
        </>
        
    
    )
}