import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const RightSide = () => {
  const data = {
    labels: ['Pending', 'Accept', 'Complete',"Rejected"],
    datasets: [
      {
        label: 'Project',
        data: [300, 50, 100,30],
        backgroundColor: [
          'blue',
          'yellow',
          'green',
          "red"
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className='w-[50%]'>
      <div className='w-full p-4 bg-white border-2 border-yellow-400 rounded-md mb-4'>
        <h2 className='text-2xl font-semibold'>Project Percentage</h2>
        <div className='w-full bg-slate-300 rounded-md h-[50vh] mt-2 flex justify-center items-center'>
          {/* Render the Pie chart */}
          <Pie data={data} options={options} />
        </div>
      </div>

      {/* <Upcoming/> */}
    </div>
  );
};

export default RightSide;
