import { useData } from "../hooks/useData.ts";
import {PieChart} from "../components/PieChart.tsx";
import {Indicator} from "../components/Indicator.tsx";

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

    const indicators = [
        { title: 'Pays participants', value: totalParticipatingCountries, className: 'text-blue-400' },
        { title: 'Éditions des JO', value: totalGamesEditions, className: 'text-green-400' },
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">
                    Historique des Jeux Olympiques - TéléSport
                </h1>
                <div className="mb-8">
                    <p className="text-lg">
                        Bienvenue sur la page dédiée à l'historique des Jeux Olympiques.
                        Explorez les performances des pays au fil des années.
                    </p>
                </div>
                <div className="mb-2">
                    { indicators.map((indicator) => (
                        <Indicator key={indicator.title} title={indicator.title} value={indicator.value} className={indicator.className} />
                    ))}
                </div>
                <PieChart data={data} />
                <div className="text-sm text-gray-400">
                    <p>Cliquez sur un pays pour voir ses détails</p>
                </div>
            </div>
        </div>
    )
}