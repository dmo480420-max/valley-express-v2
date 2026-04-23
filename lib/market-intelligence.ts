/**
 * 🚛 VALLEY EXPRESS — MARKET INTELLIGENCE LEDGER (v1.0)
 * Grounded in Phoenix Logistics Market Research (intel, tsmc, banner health, mayo clinic)
 */

export const MARKET_DATA = {
  active_lanes: [
    { id: "PHX-CHANDLER-01", sector: "SEMICONDUCTOR", priority: "STAT", target: "Intel Fab 42", distance: "24.2 mi", status: "SECURE" },
    { id: "SCOTTS-BNR-09", sector: "MEDICAL", priority: "COLD-CHAIN", target: "Banner University Med", distance: "12.8 mi", status: "IN-TRANSIT" },
    { id: "PEORIA-TSMC-04", sector: "INDUSTRIAL", priority: "RUSH", target: "TSMC Fab 21", distance: "31.5 mi", status: "QUEUED" },
    { id: "PHX-MAYO-02", sector: "MEDICAL", priority: "HIPAA-SECURE", target: "Mayo Clinic Phoenix", distance: "18.4 mi", status: "DISPATCHED" },
    { id: "AZ-CORRIDOR-L303", sector: "OVERSIZE", priority: "ESCORT-REQ", target: "Logistics Hub 303", distance: "45.1 mi", status: "STANDBY" },
  ],
  logistics_metrics: [
    { label: "Fleet Readiness", value: "98.4%", delta: "+0.2%" },
    { label: "On-Time Ratio", value: "99.9%", delta: "OPTIMAL" },
    { label: "Active Loads", value: "142", delta: "PEAK" },
    { label: "Market Volatility", value: "LOW", delta: "STABLE" },
  ],
  shippers: [
    { name: "Banner Health", type: "Health System", volume: "High", protocol: "HIPAA/ColdChain" },
    { name: "Intel Corporation", type: "Industrial", volume: "Critical", protocol: "ESD/JustInTime" },
    { name: "TSMC", type: "Semiconductor", volume: "Ultra", protocol: "High-Value/Precision" },
    { name: "Mayo Clinic", type: "Medical", volume: "Enterprise", protocol: "Urgent Care/Specimen" },
  ]
};
