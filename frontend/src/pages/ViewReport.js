import React, { useState } from "react";

const Report = ({ reportData }) => {
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (index) => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter((item) => item !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };

  return (
    <div className="mt-8 p-4 border border-[#0287BF] rounded-lg">
      <h3 className="text-xl font-bold text-[#0287BF] mb-4">Report</h3>
      {reportData.Alerts.map((alert, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex items-center"
            onClick={() => toggleExpand(index)}
            style={{ cursor: "pointer" }}
          >
            <h4 className="text-lg font-semibold mb-2">{alert.description}</h4>
            <span
              className={`${
                expanded.includes(index) ? "transform rotate-180" : ""
              } ml-2 text-[#0287BF] transition-transform duration-300`}
            >
              &#9660; {/* Downward arrow */}
            </span>
          </div>
          {expanded.includes(index) && (
            <div className="border border-gray-300 p-2">
              <p>ID: {alert.id}</p>
              <p>URL: {alert.url}</p>
              <p>Evidence: {alert.evidence}</p>
              <p>Risk: {alert.risk}</p>
              <p>Possible solution: {alert.solution}</p>
              <p>References: {alert.reference}</p>
              {/* Add more details here as needed */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Report;
