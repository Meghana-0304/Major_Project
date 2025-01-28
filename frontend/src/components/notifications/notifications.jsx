import React from "react";
import "./notifications.css";

export default function Notifications({ isOpen, onClose }) {
  return (
    <>
      {/* Display the card only when isOpen is true */}
      {isOpen && (
        <div className="notification-overlay" onClick={onClose}>
          <div
            className="notification-card"
            onClick={(e) => e.stopPropagation()} // Prevent closing the card when clicking inside it
          >
            <h3>Notifications</h3>
          </div>
        </div>
      )}
    </>
  );
}