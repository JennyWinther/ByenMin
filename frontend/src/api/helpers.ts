import { Vær } from "../components/vær/VærTyper";
import { Bruker } from "../components/bruker/BrukerTyper";

// Diverse hjelpefunksjoner for å håndtere datoer og tidspunkter i applikasjonen.


// Funksjon for å konvertere en dato i UTC-format til lokal datoformat (norsk).
export function ParseDateFromUTCToLocal(date: string) {
    let d = new Date(date);
    return d.toLocaleString("no-NO", {day: "2-digit", month: "long", year: "numeric"});
}

// Funksjon for å sjekke om brukeren er autentisert ved å sende en GET-forespørsel til backend.
// Den returnerer true hvis brukeren er logget inn, ellers false.
export async function checkAuth() {
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/me`, {
        method: "GET",
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.text();
        console.log("User is logged in:", data);
        return true;
      } else if (response.status === 401) {
        console.log("User is not logged in:", response.status);
        return false;
      } else {
        console.error("Unexpected status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
}

// Funksjon for å hente brukerens informasjon fra backend ved å sende en GET-forespørsel.
// Den returnerer brukerens informasjon i JSON-format.
export async function hentBrukerInfo() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/hentBrukerInfo`, {
            method: "GET",
            credentials: "include",
        });
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
export async function registerUser(data: Bruker) {
  console.log(data);
  try{
    const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/bruker/registrer`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(({
        brukernavn: data.brukernavn,
        passord: data.passord,
        email: data.email
     }))
    });
    console.log(response);

    if(!response.ok){
      console.log("Registration failed:");
      return false;
    }else{
      console.log("Registration successful!");
      return true; 
    }
  } 
  catch(error){
    console.error("Registration error:", error);
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
  