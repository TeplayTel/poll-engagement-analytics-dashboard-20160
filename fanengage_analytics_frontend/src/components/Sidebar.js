import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
function Sidebar({ items, selected, onSelect }) {
  /** Sidebar navigation for dashboard sections. */
  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-logo" />
        <span className="brand-title">FanEngage</span>
      </div>
      <ul className="sidebar-nav">
        {items.map(item => (
          <li
            className={selected === item.id ? "active" : ""}
            key={item.id}
            onClick={() => onSelect(item.id)}
            tabIndex={0}
            aria-label={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
