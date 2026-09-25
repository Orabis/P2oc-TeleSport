import type {Olympic} from "../models/olympics.ts";
import {buildLineData} from "../utils/chartConfig.ts";
import {Line} from "react-chartjs-2";


export function LineChart({ data }: { data: Olympic} ) {
    const { evolutionData, evolutionOptions } = buildLineData(data);

    return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div style={{height: '400px'}}>
            <Line data={evolutionData} options={evolutionOptions}/>
        </div>
        <div className="text-sm text-gray-400 text-center mt-3">
            <p>Données des 5 dernières éditions des Jeux Olympiques</p>
        </div>
    </div>
    )
}
