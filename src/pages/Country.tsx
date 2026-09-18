import type {FC} from "react";
import {useParams} from "react-router-dom";
import {Line} from "react-chartjs-2";
import {olympicsData} from "../hooks/olympicsData.ts";
import {Indicator} from "../components/Indicator.tsx";

export const Country: FC = () => {
    const { id } = useParams()

    // Anti-pattern 5 — console.log à retirer.
    console.log('Loading country with id:', id)
    // Anti-pattern 3 — Utilisation de `any` pour l'état ne permettant pas de bénéficier de TypeScript.
    const country: any = olympicsData.find((c: any) => c.id === Number(id))

    // Anti-pattern 5 — console.log à retirer.
    console.log('Country loaded:', country)

    const totalMedals = country.participations.reduce(
        (sum: any, p: any) => sum + p.medalsCount,
        0,
    )
    const totalAthletes = country.participations.reduce(
        (sum: any, p: any) => sum + p.athleteCount,
        0,
    )
    const totalParticipations = country.participations.length

    // Anti-pattern 10 — Préparation des données du graphique dans le composant — extraire dans une fonction ou un hook pour séparer UI et logique. https://react.dev/learn/thinking-in-react
    const evolutionData = {
        labels: country.participations.map((p: any) => p.year.toString()),
        datasets: [
            {
                label: 'Nombre de médailles',
                data: country.participations.map((p: any) => p.medalsCount),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    }

    const evolutionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'white',
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">{country.name}</h1>
                <div className="mb-2">
                    <Indicator title="Participations" value={totalParticipations} className='text-blue-400'/>
                    <Indicator title="Total médailles" value={totalMedals} className='text-yellow-400'/>
                    <Indicator title="Total athlètes" value={totalAthletes} className='text-green-400'/>
                </div>

                <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                    <div style={{ height: '400px' }}>
                        <Line data={evolutionData} options={evolutionOptions} />
                    </div>
                </div>

                <div className="text-sm text-gray-400">
                    <p>Données des 5 dernières éditions des Jeux Olympiques</p>
                </div>
            </div>
        </div>
    )
}