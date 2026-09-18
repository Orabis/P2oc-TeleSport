export const calculateTotalMedals = (country: any) => {
    return country.participations.reduce(
        (sum: any, p: any) => sum + p.medalsCount,
        0,
    )
}