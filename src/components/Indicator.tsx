export interface IndicatorProps {
    title: string;
    value: string | number;
    className?: string;
}

export function Indicator({title, value, className = ''}: IndicatorProps) {

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-2">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className={`text-4xl font-bold ${className}`}>{value}</p>
        </div>
    )
}
