import {Link, useParams} from "react-router-dom";
import {useData} from "../hooks/useData.ts";
import {calculateTotalAthletes, calculateTotalMedals} from "../utils/stats.ts";
import {LineChart} from "../components/LineChart.tsx";
import {HeaderComponent} from "../components/HeaderComponent.tsx";

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
                <Link to="/" className="text-gray-400 hover:text-white">Retour à l'accueil</Link>
                <HeaderComponent title={olympic.country} indicators={indicators}/>
                <LineChart data={olympic} />
                <div className="text-sm text-gray-400 text-center">
                    <p>Données des 5 dernières éditions des Jeux Olympiques</p>
                </div>
            </div>
        </div>
    )
}