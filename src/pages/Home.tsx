import { useData } from "../hooks/useData.ts";
import {PieChart} from "../components/PieChart.tsx";
import {HeaderComponent} from "../components/HeaderComponent.tsx";
import type {IndicatorProps} from "../components/Indicator.tsx";

export function Home(){
    const { data, isLoading } = useData()

    if (isLoading) {
        return(
            <div>
                <p>Loading ...</p>
            </div>
        )
    }
    const totalParticipatingCountries = data ? data.length : 0
    const totalGamesEditions = 5

    const indicators: IndicatorProps[] = [
        { title: 'Pays participants', value: totalParticipatingCountries, className: 'text-blue-400' },
        { title: 'Éditions des JO', value: totalGamesEditions, className: 'text-green-400' },
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <HeaderComponent title="Historique des Jeux Olympiques - TéléSport" indicators={indicators}/>
                <PieChart data={data} />
            </div>
        </div>
    )
}
