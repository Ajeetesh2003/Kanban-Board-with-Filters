import React, { useState } from "react";
import "./Board.css";
import { MoreHorizontal, Plus } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import { getStatusIcon, getUserIcon, getPriorityIcon } from "../Icons/Icons";

const Board = ({ title, tickets, users, grouping }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getIcon = () => {
    switch (grouping) {
      case "status":
        return getStatusIcon(title);
      case "user":
        const user = users.find((user) => user.name === title);
        return getUserIcon(user);
      case "priority":
        return getPriorityIcon(title);
      default:
        return null;
    }
  };

  return (
    <div className="board">
      <div className="board_top">
        <div className="board_top_left">
          <span style={{ marginRight: "15px" }}>{getIcon()}</span>

          <p className="board_top_title">
            {title} <span>{` ${tickets.length}`}</span>
          </p>
        </div>
        <div className="board_top_right">
          <Plus className="icon_title" style={{ cursor: "pointer" }} />
          <div
            className="board_top_more"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <MoreHorizontal style={{ cursor: "pointer" }} />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="board_dropdown">
                  <p>Delete Board</p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
      <div className="board_cards">
        {tickets.map((ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          return (
            <Card
              key={ticket.id}
              ticket={ticket}
              user={user}
              userAvailable={user ? user.available : false}
              grouping={grouping}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
