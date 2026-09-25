import {Indicator, type IndicatorProps} from "./Indicator.tsx";

export interface HeaderComponentProps {
    title: string;
    indicators: IndicatorProps[];
}
export function HeaderComponent({ title, indicators }:  HeaderComponentProps) {

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-8 text-center">
                {title}
            </h1>
            <div className="grid text-center grid-rows-2">
                {indicators.map((indicator) => (
                    <Indicator key={indicator.title} title={indicator.title} value={indicator.value} className={indicator.className}/>
                ))}
            </div>
        </div>
    )
}
