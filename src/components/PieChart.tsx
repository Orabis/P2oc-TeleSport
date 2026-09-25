import {Pie} from "react-chartjs-2";
import {useNavigate} from "react-router-dom";
import type {Olympic} from "../models/olympics.ts";
import {buildPieData} from "../utils/chartConfig.ts";


export function PieChart({ data }: { data: Olympic[] }) {
    const navigate = useNavigate();
    const { chartData, chartOptions } = buildPieData(data, (id) => navigate(`/country/${id}`));
    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <div style={{height: '400px'}}>
                    <Pie data={chartData} options={chartOptions} aria-label="Répartition du nombre total de médailles par pays aux Jeux Olympiques"/>
                </div>
                <div className="text-sm text-gray-400 text-center mt-3">
                    <p>Cliquez sur un pays pour voir ses détails</p>
                </div>
            </div>
        </>
    )
}
