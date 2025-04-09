
// Knapp som erstatter login-knappen når bruker er logget inn. Sender deg til localhost:5173/profil.

export function ProfilSideKnapp(){

    const buttonStyle = "absolute top-4 left-4 p-1 px-2 font-mono text-xs text-stone-900 bg-stone-300 rounded-md shadow-md";
    const buttonMd = " md:px-2 md:text-base";
    const buttonLg = " lg:px-3 lg:text-lg"
    
    return (
        <a 
            className={buttonStyle + buttonMd + buttonLg}
            href={`${import.meta.env.VITE_FRONTEND_URL}/profil`}>Min Side
        </a>
    )
}