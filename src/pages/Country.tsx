import {useParams} from "react-router-dom";
import {useData} from "../hooks/useData.ts";
import {Indicator} from "../components/Indicator.tsx";
import {calculateTotalAthletes, calculateTotalMedals} from "../utils/stats.ts";
import {LineChart} from "../components/LineChart.tsx";

export function Country() {
    const { id } = useParams()
    const { data, isLoading } = useData()

    if (isLoading) {
        return(
            <div>
                <p>Loading ...</p>
            </div>
        )
    }
    const olympic = data.find((c) => c.id === Number(id))

    if (!olympic) {
        return <div>Pays introuvable</div>
    }
    const totalMedals = calculateTotalMedals(olympic)
    const totalAthletes = calculateTotalAthletes(olympic)

    const totalParticipations = olympic.participations.length

    const indicators = [
        { title: 'Participations', value: totalParticipations, className: 'text-blue-400' },
        { title: 'Total médailles', value: totalMedals, className: 'text-yellow-400' },
        { title: 'Total athlètes', value: totalAthletes, className: 'text-green-400'},
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{olympic.country}</h1>
                <div className="mb-2">
                    { indicators.map((indicator) => (
                        <Indicator key= { indicator.title} title={indicator.title} value={indicator.value} className={indicator.className} />
                    ))}
                </div>
                <LineChart data={olympic} />
                <div className="text-sm text-gray-400">
                    <p>Données des 5 dernières éditions des Jeux Olympiques</p>
                </div>
            </div>
        </div>
    )
}