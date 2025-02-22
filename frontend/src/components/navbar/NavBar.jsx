import HamburgerMenu from "./HamburgerMenu";

// Fast bar, som er sticky på topp for medium/små skjermer, og stor fast på venstre side på større skjermer. 

export default function Navbar() { 
    const buttonStyle = "absolute top-4 left-4 p-1 px-2 font-mono text-xs text-stone-900 bg-stone-300 rounded-md shadow-md";
    const buttonMd = " md:px-2 md:text-base";
    const buttonLg = " lg:px-3 lg:text-lg"

    const navStyle = "fixed w-full h-16 top-0 left-0 bg-stone-500 flex justify-around align-middle z-[9999]"
    const navLg = " lg:justify-between lg:content-center"

    return (
        <div className={navStyle + navLg}>
            <div className="content-center">
                <a 
                    className={buttonStyle + buttonMd + buttonLg}
                    href="http://localhost:8080/oauth2/authorization/google">Logg inn
                </a>
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