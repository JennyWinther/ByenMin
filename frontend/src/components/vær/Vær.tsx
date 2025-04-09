import NavBar from "../navbar/NavBar"
import { useFetch } from "../../api/FetchVær"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, hentBrukerInfo } from "../../api/helpers";
import { groupByDate, ParseDateFromUTCToLocal, ParseKlokkeslettFraUTC } from "../../api/helpers";

// Ikon for ukjent værikon: https://www.flaticon.com/free-icons/unknown

// Side for å vise værdata fra Met.no APIet. 
// Henter værdata for kommunen til brukeren og viser det i en tabell, hvis brukeren ikke er logget inn, blir de sendt til login siden.

export default function Været(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [brukerInfo, setBrukerInfo] = useState<any | null>(null);
    const [URL, setURL] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
            (async () => {
                const result = await checkAuth();
                setIsLoggedIn(result);
        
                if (result) {
                    try {
                        let bruker = await hentBrukerInfo();
                        setBrukerInfo(bruker);
    
                        if (bruker && bruker.hjemkommune) {
                            setURL(`${import.meta.env.API_BACKEND_URL}/vaeret/forsideVaer/` + bruker.hjemkommune);
                        } else {
                          navigate("/login");
                        }
                    } catch (error) {
                      navigate("/login");
                    }
                } else {
                  navigate("/login");
                }
            })();
        }, []);

    const {data: vær, error, loading} = useFetch({
        url: URL
    });
    if(error) return <p>{error}</p>
    if(loading) return <p>Laster...</p>

    if(isLoggedIn === null) {
        return <p>Laster...</p>;
    }
    
    const grupperteData = groupByDate(vær);
    const datoer = Object.keys(grupperteData); 

    const thStil = "p-2 px-3 border-b-[1px] border-stone-300 m-2 font-sans min-w-20";
    const tdStil = "p-2 border-b-[1px] border-stone-300";
    const overskriftStil = "text-3xl text-stone-700 mb-6 text-center font-sans";

    return (
      <div className="mt-20">
        <NavBar />
        <h1 className={overskriftStil}>Været i {brukerInfo.hjemkommune}</h1>

        {datoer.map(dato => {
          const timeslots = grupperteData[dato];
          const parsedDato = ParseDateFromUTCToLocal(dato);
  
          return (
            
            <table key={dato} className="rounded-md table-auto text-stone-600 bg-stone-100 shadow-[0px_-1px_12px_0px_rgba(0,_0,_0,_0.3)] w-2/4 font-sans m-auto mb-5">
              <thead>
                <tr>
                  <th colSpan={5}
                    className="p-2 px-3 bg-stone-100 border-b-[1px] m-2 font-sans text-pretty text-stone-700"
                  >{parsedDato}</th>
                </tr>
                <tr>
                  <th className={thStil}>Tid</th>
                  <th className={thStil}>Temp.</th>
                  <th className={thStil}>Nedbør</th>
                  <th className={thStil}>Vind</th>
                </tr>
              </thead>
              <tbody className="rounded-b-sm">
                {timeslots.map((t, index) => {
                    //Finn riktig værsymbol
                    let værsymbol = "";
                    if(t.vaerSymbol === "Ukjent") {
                        værsymbol = "unknown.png";
                    }
                    else{
                        værsymbol = t.vaerSymbol + ".svg";
                    }
                    
                  return (
                    <tr key={index}>
                        <td className={tdStil}>{ ParseKlokkeslettFraUTC(t.tidspunkt) }</td>
                        <td className={tdStil + " bg-stone-200 bg-opacity-50"}>
                            <img
                                className="w-8 h-8 inline-block"
                                src={"/ikonerVær/" + værsymbol}
                                alt="Værikon"
                            /> 
                            {t.luftTemperatur}°C
                        </td>
                      <td className={tdStil}>{t.nedbor} mm</td>
                      <td className={tdStil  + " bg-stone-200 bg-opacity-50"}>{t.vindHastighet} m/s</td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    );
  }