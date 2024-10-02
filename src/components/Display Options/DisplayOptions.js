import React, { useState } from "react";
import "./DisplayOptions.css";
import DisplayIcon from "../Icons/Icons";

const DisplayOptions = ({
  grouping,
  sorting,
  onGroupingChange,
  onSortingChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="display-options">
      <button
        className="display-button"
        onClick={() => setShowOptions(!showOptions)}
      >
        <DisplayIcon className="icon" />
        <span>Display</span>
        <span className="arrow-down">▼</span>
      </button>
      {showOptions && (
        <div className="options-dropdown">
          <div className="option">
            <label>Grouping</label>
            <select
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="option">
            <label>Ordering</label>
            <select
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayOptions;
