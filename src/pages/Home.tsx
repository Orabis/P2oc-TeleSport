import {type FC, useEffect, useState} from "react";
import {olympicsData} from "../hooks/olympicsData.ts";
import {Charts} from "../components/Charts.tsx";
import {Indicator} from "../components/Indicator.tsx";


export const Home: FC = () => {
    // Anti-pattern 3 — Utilisation de `any` — typer pour garder les bénéfices TypeScript.
    const [data, setData] = useState<any>(null)

    // Anti-pattern 4 — useEffect avec logique lourde dans le composant — idéalement : custom hook ou librairie de fetching de données (ex. react-query).
    // De plus en mode développement, le "strict mode" de React est activé, ce qui va éxecuter ce code 2
    // Pour aller plus loin : https://react.dev/learn/you-might-not-need-an-effect
    useEffect(() => {
        // Anti-pattern 5 — console.log à retirer.
        console.log('Loading data...')
        setTimeout(() => {
            setData(olympicsData)
            // Anti-pattern 5 — console.log à retirer.
            console.log('Data loaded:', olympicsData)
        }, 500)
    }, [])

    const totalParticipatingCountries = data ? data.length : 0
    const totalGamesEditions = 5

    // Anti-pattern 7 — État de chargement dérivé des données au lieu d'un état dédié (loading/error).
    if (!data) {
        return <div>Chargement...</div>
    }

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
                    <Indicator title={'Pays participants'} value={totalParticipatingCountries} className='text-blue-400'/>
                    <Indicator title={'Éditions des JO'} value={totalGamesEditions} className='text-green-400'/>
                </div>
                <Charts data={data} />
            </div>
        </div>
    )
}