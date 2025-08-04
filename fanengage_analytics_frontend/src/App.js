import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MetricsOverview from "./components/MetricsOverview";
import FilterPanel from "./components/FilterPanel";
import ChartBox from "./components/ChartBox";
import Heatmap from "./components/Heatmap";
import DetailCards from "./components/DetailCards";
import { getPollSummary, sendHeartbeat } from "./api";

// PUBLIC_INTERFACE
function App() {
  // Main theme state
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  // Navigation sections
  const sections = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "heatmap", label: "Heatmap", icon: "🔥" },
    { id: "geo", label: "Geo", icon: "🌎" },
    { id: "breakdown", label: "Poll Breakdown", icon: "🔎" }
  ];
  const [selectedSection, setSelectedSection] = useState("dashboard");

  // Dashboard filter/payload
  const [filter, setFilter] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  // Poll summary fetch
  useEffect(() => {
    setLoading(true);
    getPollSummary(filter).then(res => {
      setSummary(res || null);
      setLoading(false);
    });
  }, [filter]);

  // Simulate heartbeat ping for presence tracking
  useEffect(() => {
    const presenceInterval = setInterval(() => {
      sendHeartbeat({
        user_id: "frontendDemo",
        session_id: "demoSession1",
        device_info: window.navigator.userAgent,
        platform: "web"
      });
    }, 90000);
    return () => clearInterval(presenceInterval);
  }, []);

  // Generate chart data from summary
  function getChartData(summary) {
    if (!summary) return {};
    const pollType = summary.poll_type_popularity || {};
    return {
      pollType: {
        labels: Object.keys(pollType),
        datasets: [{
          label: "Poll Types",
          data: Object.values(pollType),
          backgroundColor: [
            "rgba(0,74,173,0.85)",
            "rgba(0,230,184,0.9)",
            "rgba(255,178,0,0.85)",
            "rgba(112,85,219,0.70)"
          ]
        }]
      },
      geo: {
        labels: Object.keys(summary.geo_distribution || {}),
        datasets: [{
          label: "Geo Distribution",
          data: Object.values(summary.geo_distribution || {}),
          backgroundColor: "rgba(0,230,184,0.7)"
        }]
      },
      heatmapArr: Array.isArray(summary.heatmap)
        ? summary.heatmap
        : Object.keys(summary.heatmap || {}).map((k) => ({
            value: summary.heatmap[k]
          }))
    };
  }

  const chartData = getChartData(summary);

  // Main UI
  return (
    <div style={{display:"flex",minHeight:"100vh",background:"var(--bg-primary)"}}>
      <Sidebar
        items={sections}
        selected={selectedSection}
        onSelect={setSelectedSection}
      />

      <div style={{flex:"1 1",display:"flex",flexDirection:"column",minHeight:"100vh",padding:"0"}}>
        <div className="App-header" style={{position:"relative",background:"var(--bg-secondary)"}}>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <h2 style={{marginTop:"24px",marginLeft:"10px",fontWeight:700,fontSize:"1.7em",color:"var(--primary)"}}>
            FanEngage Analytics Dashboard
          </h2>
        </div>
        <div className="dashboard-main" style={{
            padding:"20px 22px",flex:1, display:"flex",flexDirection:"column"
          }}>
          <FilterPanel onFilter={setFilter} />
          {loading && <div style={{margin:"18px",color:"#555"}}>Loading...</div>}
          {!loading && summary && (
            <>
              <MetricsOverview metrics={summary} />
              <div style={{display:"flex", gap:"18px", flexWrap:"wrap"}}>
                {selectedSection === "dashboard" && (
                  <>
                    <ChartBox
                      type="bar"
                      title="Poll Types Popularity"
                      data={chartData.pollType}
                      options={{
                        indexAxis: "y",
                        plugins: {legend:{display:false}},
                        responsive: true,
                        scales: {
                          x: { beginAtZero: true, grid:{display:false} },
                          y: { grid: { display: false } }
                        }
                      }}
                    />
                    <ChartBox
                      type="pie"
                      title="Geo Distribution"
                      data={chartData.geo}
                      options={{
                        responsive: true,
                        plugins:{legend:{position:"bottom"}}
                      }}
                    />
                    <ChartBox
                      type="line"
                      title="Response Time Trend"
                      data={{
                        labels: ["Day 1","Day 2","Day 3"],
                        datasets: [{
                          data: [2.1,2.7,2.3],
                          borderColor:"rgba(0,74,173,0.87)",
                          fill:false,
                          tension:0.22
                        }]
                      }}
                      options={{
                        responsive:true,plugins:{legend:{display:false}},
                        scales:{y: {beginAtZero:true}}
                      }}
                    />
                  </>
                )}
                {selectedSection === "heatmap" && (
                  <Heatmap
                    data={chartData.heatmapArr}
                    title="Poll Activity Heatmap"
                  />
                )}
                {selectedSection === "geo" && (
                  <ChartBox
                    type="pie"
                    title="Geo Distribution"
                    data={chartData.geo}
                    options={{
                      responsive: true,
                      plugins:{legend:{position:"bottom"}}
                    }}
                  />
                )}
                {selectedSection === "breakdown" && (
                  <DetailCards summary={summary} />
                )}
              </div>
              <div style={{marginTop:"35px"}}>
                <DetailCards summary={summary} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
