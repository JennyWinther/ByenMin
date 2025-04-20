import { Vær } from "../components/vær/VærTyper";
import { Bruker, BrukerInfo } from "../components/bruker/BrukerTyper";
import { CsrfContextType } from "./CsrfType";

// Diverse hjelpefunksjoner for å håndtere datoer og tidspunkter i applikasjonen.

// Funksjon for å konvertere en dato i UTC-format til lokal datoformat (norsk).
export function ParseDateFromUTCToLocal(date: string) {
    let d = new Date(date);
    return d.toLocaleString("no-NO", {day: "2-digit", month: "long", year: "numeric"});
}

// Funksjon for å sjekke om brukeren er autentisert ved å sende en GET-forespørsel til backend.
// Den returnerer true hvis brukeren er logget inn, ellers false.
export async function checkAuth(csrfContext: CsrfContextType): Promise<boolean>  {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/me`, {
        method: "GET",
        credentials: "include",
      });

      const nyCsrfToken = hentCsrfTokenFraHeader(csrfContext, response);
      csrfContext.updateCsrfToken(nyCsrfToken);
  
      if (response.ok) {
        const data = await response.text();
        return true;
      } else if (response.status === 401) {
        return false;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
}

// Funksjon for å hente brukerens informasjon fra backend ved å sende en GET-forespørsel.
// Den returnerer brukerens informasjon i JSON-format.
export async function hentBrukerInfo(csrfContext: CsrfContextType): Promise<BrukerInfo | null>  {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/hentBrukerInfo`, {
            method: "GET",
            credentials: "include",
        });

        const nyCsrfToken = hentCsrfTokenFraHeader(csrfContext, response);
        csrfContext.updateCsrfToken(nyCsrfToken);

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}

// Funksjon for å registrere en ny bruker ved å sende en POST-forespørsel med brukerens informasjon.
// Den tar inn et objekt av typen Bruker (BrukerTyper.ts) som inneholder brukernavn, passord og e-postadresse.
export async function registerUser(csrfContext: CsrfContextType, data : Bruker): Promise<boolean>  {
  try{
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/registrer`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrfContext.csrfToken ?? ""
      },
      body: JSON.stringify(({
        brukernavn: data.brukernavn,
        passord: data.passord,
        email: data.email
     }))
    });

    const nyCsrfToken = hentCsrfTokenFraHeader(csrfContext, response);
    csrfContext.updateCsrfToken(nyCsrfToken);

    if(!response.ok){
      return false;
    }else{
      return true; 
    }
  } 
  catch(error){
    return false;
  }
}

// Funksjon for å gruppere værdataene etter dato. Den tar inn en liste med værdata (Vær) og returnerer et objekt der nøklene er datoene og verdiene er lister med værdata for den datoen.
// Den bruker reduce-metoden for å iterere over værdataene og bygge opp objektet.
export function groupByDate(weatherData: Vær[]): Record<string, Vær[]> {
  return weatherData.reduce((acc, item) => {
    const datePart = item.tidspunkt.split("T")[0];
    if (!acc[datePart]) {
      acc[datePart] = [];
    }
    acc[datePart].push(item);
    return acc;
  }, {} as Record<string, Vær[]>);
}

// Funksjon for å konvertere en dato i UTC-format til lokal tid (norsk) med time og minutt.
export function ParseKlokkeslettFraUTC(date: string) {
    let d = new Date(date);
    return d.toLocaleString("no-NO", {hour: "numeric", minute: "numeric"});
}


// Hjelpefunksjon for å hente CSRF token fra response headers
export function hentCsrfTokenFraHeader(csrfContext: CsrfContextType, response : Response): string  {
  let header = response.headers.get("x-csrf-token");

  if(header === null){
    return "";
  }
  let nyCsrfToken = decodeURIComponent(header);

  if(nyCsrfToken === null){
    return "";
  }
  csrfContext.updateCsrfToken(nyCsrfToken);
  return nyCsrfToken;
}