import React from "react";
import "./MetricsOverview.css";

// PUBLIC_INTERFACE
function MetricsOverview({ metrics }) {
  /** Shows key metrics as overview cards. */
  const items = [
    { key: "total_polls", label: "Total Polls", color: "#004AAD" },
    { key: "total_votes", label: "Total Votes", color: "#00E6B8" },
    { key: "response_time_avg", label: "Avg. Response (s)", color: "#FFB200" },
  ];
  return (
    <section className="metrics-overview">
      {items.map(({ key, label, color }) => (
        <div className="metric-card" style={{ borderBottom: `4px solid ${color}` }} key={key}>
          <div className="metric-label">{label}</div>
          <div className="metric-value">
            {metrics?.[key] !== undefined
              ? (key === "response_time_avg"
                ? Number(metrics[key]).toFixed(2)
                : metrics[key])
              : "--"}
          </div>
        </div>
      ))}
    </section>
  );
}

export default MetricsOverview;
