import React from 'react';
import './placeholder.css'; // Import the CSS file containing the above styles

const Placeholder: React.FC = () => {
  const rowCount = 10;  // Number of rows you want to display in the placeholder

  return (
    <div className="skeleton-placeholder" data-testid="skeleton-placeholder">
      {Array.from({ length: rowCount }).map((_, index) => (
        <div className="skeleton-row" key={index}>
          <div className="skeleton-item skeleton-item-small"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item skeleton-item-large"></div>
          <div className="skeleton-item skeleton-item-small"></div>
        </div>
      ))}
    </div>
  );
};

export default Placeholder;