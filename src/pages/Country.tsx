import {Link, useNavigate, useParams} from "react-router-dom";
import {useData} from "../hooks/useData.ts";
import {calculateTotalAthletes, calculateTotalMedals} from "../utils/stats.ts";
import {LineChart} from "../components/LineChart.tsx";
import {HeaderComponent} from "../components/HeaderComponent.tsx";
import {useEffect} from "react";

export function Country() {
    const { id } = useParams()
    const { data, isLoading } = useData()
    const olympic = data.find((c) => c.id === Number(id))
    const navigate = useNavigate()

    useEffect(() => {
        if ( !isLoading && !olympic) {
            navigate(`/NotFound`, {replace: true})
        }

    }, [isLoading, navigate, olympic]);

    if (!olympic) return null

    if (isLoading) {
        return(
            <div>
                <p>Loading ...</p>
            </div>
        )
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
                <Link to="/" className="text-gray-400 hover:text-white mb-12">Retour</Link>
                <HeaderComponent title={olympic.country} indicators={indicators}/>
                <LineChart data={olympic} />
            </div>
        </div>
    )
}