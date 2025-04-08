import HamburgerMenu from "./HamburgerMenu";
import { LoginKnapp } from "../bruker/LoginKnapp";
import { checkAuth } from "../../api/helpers";
import { useEffect, useState } from "react";
import { ProfilSideKnapp } from "../bruker/ProfilsideKnapp";

// Fast bar, som er sticky på topp for medium/små skjermer, og stor fast på venstre side på større skjermer.
// Inneholder logo og hamburger-meny for navigering.
// Inneholder også login-knapp eller profil-knapp, avhengig av om bruker er logget inn eller ikke.

export default function Navbar() { 
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        (async () => {
            const result = await checkAuth();
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
            

            <div className="absolute top-5 md:top-2 left-[48vw]">
                <a
                    href="http://localhost:5173/"
                    className="font-mono text-xl md:text-3xl text-stone-200 hover:decoration-solid decoration-stone-200 ">MinBy</a>
            </div>
            
            <div className="lg:mt-2">
                <HamburgerMenu />
            </div>
        </div>
    )
}