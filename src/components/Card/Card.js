import React from "react";
import "./Card.css";
import { MoreHorizontal, Clock, CheckSquare } from "react-feather";
import Chip from "../Chip/Chip";
import { getUserIcon, getPriorityIcon, getStatusIcon } from "../Icons/Icons";

const Card = ({ ticket, user, userAvailable, grouping }) => {
  const renderUserIcon = () => {
    if (grouping === "user") {
      return (
        <div className="card_icon user_icon">
          <span className="user-availability-indicator" />
        </div>
      );
    }
    return (
      <div className="card_user_icon">
        {getUserIcon(user)}
        <span
          className="user-availability-indicator"
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: userAvailable ? "green" : "rgb(169, 165, 165)",
            position: "absolute",
            bottom: "-6px",
            right: "-5px",
            border: "2px solid white",
          }}
        />
      </div>
    );
  };

  const renderPriorityIcon = () => {
    if (grouping === "priority") {
      return (
        <span
          className="priority-indicator"
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "rgb(169, 165, 165)",
            display: "inline-block",
            marginRight: "2px",
          }}
        />
      );
    }
    return getPriorityIcon(ticket.priority);
  };

  return (
    <div className="card">
      <div className="card_top">
        <div className="card_id">{ticket.id}</div>
        {renderUserIcon()}
      </div>

      <div className="card_title">{ticket.title}</div>
      <div className="card_footer">
        <div className="card_priority">
          {/* {getPriorityIcon(ticket.priority)} */}
          {renderPriorityIcon()}
          {ticket.tag.map((tag, index) => (
            <Chip key={index} text={ticket.tag[0]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
