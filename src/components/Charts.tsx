import {Pie} from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
} from 'chart.js'
import {calculateTotalMedals} from "../utils/buildGraph.ts";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
)

export function Charts({data}) {
    const chartData = {
        labels: data.map((d: any) => d.name),
        datasets: [
            {
                label: 'Total des médailles',
                data: data.map((d: any) => calculateTotalMedals(d)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: 'white',
                },
            },
        },
    }
    return (
        <>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <div style={{height: '400px'}}>
                    <Pie data={chartData} options={chartOptions}/>
                </div>
            </div>
            <div className="text-sm text-gray-400">
                <p>Cliquez sur un pays pour voir ses détails</p>
            </div>
        </>
    )
}