import type {Data} from "../hooks/useData.ts";
import {buildLineData} from "../utils/chartConfig.ts";
import {Line} from "react-chartjs-2";


export function LineChart({ data }: { data: Data} ) {
    const { evolutionData, evolutionOptions } = buildLineData(data);

    return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
        <div style={{height: '400px'}}>
            <Line data={evolutionData} options={evolutionOptions}/>
        </div>
    </div>
    )
}