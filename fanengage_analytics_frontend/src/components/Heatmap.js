import React from "react";
import "./Heatmap.css";

// PUBLIC_INTERFACE
function Heatmap({ data, title }) {
  // In a full app, render a real heatmap; here we fake a grid for demo
  return (
    <div className="heatmap-card">
      <div className="heatmap-title">{title}</div>
      <div className="heatmap-demo">
        {Array.isArray(data) ? (
          data.map((cell, i) => (
            <span
              key={i}
              className="heatmap-cell"
              style={{
                background: `rgba(0, 74, 173, ${Math.max(0.15, (cell.value || 0) / 100)})`,
                opacity: 0.93,
              }}
              title={`Activity: ${cell.value}`}
            />
          ))
        ) : (
          <span style={{color:'#999'}}>No data</span>
        )}
      </div>
    </div>
  );
}
export default Heatmap;
