/**
 * Backend API wrapper for analytics dashboard.
 * 
 * - getPollSummary: fetch analytics summary data.
 * - sendHeartbeat: post heartbeat for presence.
 */
const API_BASE = process.env.REACT_APP_ANALYTICS_API || "http://localhost:3001";

export async function getPollSummary({ since, until, pollType }) {
  // PUBLIC_INTERFACE
  /**
   * Query analytics summary from backend.
   * @param {Object} filter - { since, until, pollType }
   * @returns poll summary object or null
   */
  let url = `${API_BASE}/fanEngage/analytics/v1/pollSummary`;
  const params = [];
  if (since) params.push(`since=${encodeURIComponent(since)}`);
  if (until) params.push(`until=${encodeURIComponent(until)}`);
  // If poll type filter is needed, optionally append (not in schema).
  // if (pollType) params.push(`poll_type=${encodeURIComponent(pollType)}`);
  if (params.length) url += `?${params.join("&")}`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("Failed to fetch summary");
    return await resp.json();
  } catch (e) {
    return null;
  }
}

export async function sendHeartbeat({ user_id, session_id, device_info, platform }) {
  // PUBLIC_INTERFACE
  /**
   * Send heartbeat to track viewer presence.
   */
  const resp = await fetch(`${API_BASE}/fan-engagement/analytics/v1/heartbeat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id, session_id, device_info, platform, timestamp: (new Date()).toISOString()
    })
  });
  return resp.ok;
}
