import {Indicator, type IndicatorProps} from "./Indicator.tsx";

export interface HeaderComponentProps {
    title: string;
    indicators: IndicatorProps[];
}
export function HeaderComponent({ title, indicators }:  HeaderComponentProps) {

    return (
        <div className="flex items-center flex-col">
            <h1 className="text-4xl font-bold mb-8">
                {title}
            </h1>
            <div className="flex mb-2 items-center flex-row justify-center gap-8">
                {indicators.map((indicator) => (
                    <Indicator key={indicator.title} title={indicator.title} value={indicator.value} className={indicator.className}/>
                ))}
            </div>
        </div>
    )
}
