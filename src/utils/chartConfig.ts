import type {Data} from "../hooks/useData.ts";
import {calculateTotalMedals} from "./stats.ts";

export const buildPieData = (data: Data[]) => ({
    chartData: {
        labels: data.map((d) => d.name),
        datasets: [
            {
                label: 'Total des médailles',
                data: data.map((d) => calculateTotalMedals(d)),
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
    },
    chartOptions: {
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
    },
})

export const buildLineData = (country: Data) => ({
    evolutionData: {
        labels: country.participations.map((p) => p.year.toString()),
        datasets: [
            {
                label: 'Nombre de médailles',
                data: country.participations.map((p) => p.medalsCount),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    },
    evolutionOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'white',
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
    },
})
