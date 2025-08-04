import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ChartBox.css";

ChartJS.register(
  BarElement, CategoryScale, LinearScale, ArcElement,
  PointElement, LineElement, Tooltip, Legend
);

// PUBLIC_INTERFACE
function ChartBox({ type, title, data, options }) {
  /** Renders bar, pie, line charts via Chart.js. */
  let ChartComponent;
  if (type === "bar") ChartComponent = Bar;
  else if (type === "pie") ChartComponent = Pie;
  else ChartComponent = Line;

  return (
    <div className="chart-box">
      <div className="chart-title">{title}</div>
      <div className="chart-render">
        <ChartComponent data={data} options={options} />
      </div>
    </div>
  );
}

export default ChartBox;
