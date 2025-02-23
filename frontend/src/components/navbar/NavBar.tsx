import HamburgerMenu from "./HamburgerMenu";
import { LoginKnapp } from "./LoginKnapp";

// Fast bar, som er sticky på topp for medium/små skjermer, og stor fast på venstre side på større skjermer. 

export default function Navbar() { 


    const navStyle = "fixed w-full h-16 top-0 left-0 bg-stone-500 flex justify-around align-middle z-[9999]"
    const navLg = " lg:justify-between lg:content-center"

    return (
        <div className={navStyle + navLg}>
            <div className="content-center">
                <LoginKnapp />
            </div>

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