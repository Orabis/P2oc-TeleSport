import type {Olympic} from "../models/olympics.ts";

export const calculateTotalMedals = (olympic: Olympic) => {
    return olympic.participations.reduce(
        (sum: number, p) => sum + p.medalsCount,
        0,
    )
}
export const calculateTotalAthletes = (olympic: Olympic) => {
    return olympic.participations.reduce(
        (sum: number, p) => sum + p.athleteCount,
        0,
    )
}
