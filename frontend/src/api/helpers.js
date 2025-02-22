
export function ParseDateFromUTCToLocal(date) {
    let d = new Date(date);
    return d.toLocaleString("no-NO", {day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "numeric"});
}

export function DetermineWeatherIcon(weather){
    
}

export async function checkAuth() {
    try {
      const response = await fetch("http://localhost:8080/api/me", {
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
  