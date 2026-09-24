import {Pie} from "react-chartjs-2";
import type {Olympic} from "../models/olympics.ts";
import {buildPieData} from "../utils/chartConfig.ts";


export function PieChart({ data }: { data: Olympic[] }) {
    const { chartData, chartOptions } = buildPieData(data);
    return (
        <>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <div style={{height: '400px'}}>
                    <Pie data={chartData} options={chartOptions}/>
                </div>
            </div>
        </>
    )
}
