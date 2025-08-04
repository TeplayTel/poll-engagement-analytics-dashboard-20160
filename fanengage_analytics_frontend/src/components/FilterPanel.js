import React, { useState } from "react";
import "./FilterPanel.css";

// PUBLIC_INTERFACE
function FilterPanel({ onFilter }) {
  /** Controls for filtering dashboard analytics: date range and poll type. */
  const [since, setSince] = useState("");
  const [until, setUntil] = useState("");
  const [pollType, setPollType] = useState("");

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    onFilter({
      since: since ? since : undefined,
      until: until ? until : undefined,
      pollType: pollType ? pollType : undefined,
    });
  }

  return (
    <form className="filter-panel" onSubmit={handleSubmit}>
      <label>
        <span>Date from:</span>
        <input type="date" value={since} onChange={e => setSince(e.target.value)} />
      </label>
      <label>
        <span>Date to:</span>
        <input type="date" value={until} onChange={e => setUntil(e.target.value)} />
      </label>
      <label>
        <span>Poll Type:</span>
        <select value={pollType} onChange={e => setPollType(e.target.value)}>
          <option value="">All</option>
          <option value="quiz">Quiz</option>
          <option value="survey">Survey</option>
          <option value="prediction">Prediction</option>
        </select>
      </label>
      <button className="btn-filter" type="submit">Apply Filter</button>
    </form>
  );
}
export default FilterPanel;
