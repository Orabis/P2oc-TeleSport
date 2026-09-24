import type {Data} from "../hooks/useData.ts";

export const calculateTotalMedals = (country: Data) => {
    return country.participations.reduce(
        (sum: number, p) => sum + p.medalsCount,
        0,
    )
}
export const calculateTotalAthletes = (country: Data) => {
    return country.participations.reduce(
        (sum: number, p) => sum + p.athleteCount,
        0,
    )
}
