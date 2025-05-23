import HamburgerMenu from "./HamburgerMenu";
import { LoginKnapp } from "../bruker/LoginKnapp";
import { checkAuth } from "../../api/helpers";
import { useEffect, useState } from "react";
import { ProfilSideKnapp } from "../bruker/ProfilsideKnapp";
import { useCsrfContext } from "../../api/CsrfContext";

// Fast bar, som er sticky på topp for medium/små skjermer, og stor fast på venstre side på større skjermer.
// Inneholder logo og hamburger-meny for navigering.
// Inneholder også login-knapp eller profil-knapp, avhengig av om bruker er logget inn eller ikke.

export default function Navbar() { 
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const csrfContext = useCsrfContext();

    useEffect(() => {
        (async () => {
            const result = await checkAuth(csrfContext);
            setIsLoggedIn(result);
        }
        )();
    }
    , []);

    const navStyle = "fixed w-full h-16 top-0 left-0 bg-stone-500 flex justify-around align-middle z-[9999]"
    const navLg = " lg:justify-between lg:content-center"

    return (
        <div className={navStyle + navLg}>
            {isLoggedIn ? (
                <div className="content-center">
                <ProfilSideKnapp />
                </div>
            ) : (
                <div className="content-center">
                    <LoginKnapp />  
                </div>
            )}
            

            <div className="absolute top-5 md:top-2 left-[45vw]">
                <a
                    href={`${import.meta.env.VITE_FRONTEND_URL}`}
                    className="font-mono text-xl md:text-3xl text-center text-stone-200 hover:decoration-solid decoration-stone-200 ">ByenMin</a>
            </div>
            
            <div className="lg:mt-2">
                <HamburgerMenu />
            </div>
        </div>
    )
}