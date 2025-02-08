
export function ParseDateFromUTCToLocal(date) {
    let d = new Date(date);
    return d.toLocaleString("no-NO", {day: "2-digit", month: "long", year: "numeric", hour: "numeric", minute: "numeric"});
}