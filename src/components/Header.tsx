import {Indicator} from "./Indicator.tsx";
import type {IndicatorProps} from "./Indicator.tsx";

export function Header({ indicators }: { indicators: IndicatorProps[]}) {

    return (
        <>
            <h1 className="text-4xl font-bold mb-8">
                Historique des Jeux Olympiques - TéléSport
            </h1>
            <div className="mb-2">
                {indicators.map((indicator) => (
                    <Indicator key={indicator.title} title={indicator.title} value={indicator.value} className={indicator.className}/>
                ))}
            </div>
        </>
    )
}
