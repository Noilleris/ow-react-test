import React from 'react';
import './chart.css'; // Include CSS for the placeholder

const ChartPlaceholder: React.FC = () => {
  return (
    <div className="chart-placeholder" data-testid={"chart-placeholder"}>
      <div className="placeholder-bar"></div>
      <div className="placeholder-bar"></div>
      <div className="placeholder-bar"></div>
      <div className="placeholder-bar"></div>
      <div className="placeholder-bar"></div>
    </div>
  );
};

export default ChartPlaceholder;