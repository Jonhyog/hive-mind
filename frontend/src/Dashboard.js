// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, TimeScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, TimeScale, LinearScale, Title, Tooltip, Legend);

const ChartComponent = ({ title, dataUrl }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const result = await response.json();

        // Verifica se o result não está vazio e ordena por timestamp
        if (result && result.length > 0) {
          setData(prevData => {
            const updatedData = [...prevData, ...result];

            // Mantém apenas os últimos 50 pontos
            if (updatedData.length > 50) {
              updatedData.splice(0, updatedData.length - 50);
            }

            // Ordena os dados pelo timestamp
            updatedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

            return updatedData;
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Inicializa a carga de dados
    const intervalId = setInterval(fetchData, 1000); // Atualiza a cada 1 segundo

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
  }, [dataUrl]);

  const chartData = {
    labels: data.map(entry => entry.timestamp),
    datasets: [
      {
        label: title,
        data: data.map(entry => ({
          x: entry.timestamp,
          y: entry.value,
        })),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${title}: ${context.raw.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 30,
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 50, // Ajuste o máximo conforme necessário
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <ChartComponent title="Temperatura" dataUrl="http://localhost:3003/metrics/temperature" />
      </div>
      <div className="chart-container">
        <ChartComponent title="Pressão" dataUrl="http://localhost:3003/metrics/pressure" />
      </div>
      <div className="chart-container">
        <ChartComponent title="Umidade" dataUrl="http://localhost:3003/metrics/umidity" />
      </div>
      <div className="chart-container">
        <ChartComponent title="Barulho" dataUrl="http://localhost:3003/metrics/noise" />
      </div>
    </div>
  );
};

export default Dashboard;
