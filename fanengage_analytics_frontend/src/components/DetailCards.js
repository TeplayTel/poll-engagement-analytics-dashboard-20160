import React from "react";
import "./DetailCards.css";

// PUBLIC_INTERFACE
function DetailCards({ summary }) {
  const cards = [
    {
      title: "Pop. Words",
      data: summary.popular_words,
      render: (arr) => (
        <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
          {(arr || []).map((w,i)=><span key={i} className="word-pill">{w}</span>)}
        </div>
      ),
    },
    {
      title: "Device Breakdown",
      data: summary.device_breakdown,
      render: (obj) => (
        <ul>
          {obj && Object.entries(obj).map(([k, v],i) =>
            <li key={i}>{k}: {v}</li>
          )}
        </ul>
      ),
    },
    {
      title: "Rejection Reasons",
      data: summary.rejection_reasons,
      render: (obj) => (
        <ul>
          {obj && Object.entries(obj).map(([k,v],i)=>
            <li key={i}>{k}: {v}</li>
          )}
        </ul>
      ),
    }
  ];
  return (
    <section className="detail-cards">
      {cards.map(card =>
        <div className="detail-card" key={card.title}>
          <div className="detail-title">{card.title}</div>
          <div className="detail-body">{card.render(card.data)}</div>
        </div>
      )}
    </section>
  );
}
export default DetailCards;
