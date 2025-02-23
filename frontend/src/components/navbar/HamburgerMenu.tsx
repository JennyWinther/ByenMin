import { useState } from "react"

//Hamburger-meny for små/medium skjermer. Når skjermen blir stor nok, blir menyen lagt over på navbar isteden.

export default function HamburgerMenu(){
    const listStyle = "flex flex-col justify-evenly items-center z-[9998]"
    const listItemStyle = "text-stone-600 text-2xl mb-6 border-b-[1px] pb-6"
    
    const menuStyle = "block z-[9999] absolute w-[100%] h-[100vh] top-0 left-0 bg-white z-10 flex flex-col justify-evenly items-center"

    const [menuToggle, setMenuToggle] = useState(false);

    return (
        <div>
            <section
                id="hamburgerMenu" 
                className="lg:hidden"   
            >
                {/* Hamburger meny */}
                <div
                    className="space-y-2 top-5 right-[5vw] fixed"
                    onClick={() => setMenuToggle((prev) => !prev)}
                >
                    <span className="block h-0.5 w-7 bg-stone-200"></span>
                    <span className="block h-0.5 w-7 bg-stone-200"></span>
                    <span className="block h-0.5 w-7 bg-stone-200"></span>
                </div>

                {/* INNI HAMBURGER */}
                <div className={menuToggle ? menuStyle : "hidden"}
                    onClick={() => setMenuToggle(false)}>

                    {/* X for åpen hamburgermeny */}
                    <svg
                        className="h-8 w-8 text-gray-600 fixed top-5 right-5 "
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>

                    <ul 
                        id="desktopMeny"
                        className={listStyle}
                    >
                        <li className={listItemStyle}>
                            <a href="http://localhost:5173/">Forside</a>
                        </li>
                        <li className={listItemStyle}>
                            <a href="http://localhost:5173/politiloggen">Politiloggen</a>
                        </li>
                        {/* <li className={listItemStyle}>
                            <a href="http://localhost:5173/vaeret">Været</a>
                        </li> */}
                    </ul>
                </div>
                
            </section>

            {/* Meny for hvis skjerm krysser breakpoint for stor skjerm */}
            <div className="lg:min-w-72">
                <ul 
                    id="desktopMeny"
                    className="hidden lg:flex lg:flex-row lg:m-2 lg:justify-around  lg:align-middle w-96  lg:text-stone-200 lg:text-xl lg:text-nowrap decoration-solid decoration-1 decoration-gray-900"
                >
                    <li>
                        <a href="http://localhost:5173/">Forside</a>
                    </li>
                    <li>
                        <a href="http://localhost:5173/politiloggen">Politiloggen</a>
                    </li>
                    {/* <li>
                            <a href="http://localhost:5173/vaeret">Været</a>
                    </li> */}
                </ul>
            </div>
            
        </div>
    )
}