import React from 'react';
import './usage.css'; // Import the CSS styles

type UsageErrorMessageProps = {
  message: string;
};

const UsageErrorMessage: React.FC<UsageErrorMessageProps> = ({ message }) => {
  const handleReload = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <h2 className="error-title">Something went wrong</h2>
        <p className="error-message">{message}</p>
        <button className="reload-button" onClick={handleReload}>
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default UsageErrorMessage;
