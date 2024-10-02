import React, { useEffect, useState } from "react";
import Board from "./components/Board/Board";
import DisplayOptions from "./components/Display Options/DisplayOptions";

import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem("grouping") || "status";
  });
  const [sorting, setSorting] = useState(() => {
    return localStorage.getItem("sorting") || "priority";
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGroupingChange = (newGrouping) => {
    setGrouping(newGrouping);
  };

  const handleSortingChange = (newSorting) => {
    setSorting(newSorting);
  };

  const groupTickets = () => {
    let groupedTickets = {};

    switch (grouping) {
      case "status":
        groupedTickets = tickets.reduce((acc, ticket) => {
          if (!acc[ticket.status]) {
            acc[ticket.status] = [];
          }
          acc[ticket.status].push(ticket);
          return acc;
        }, {});
        break;

      case "user":
        groupedTickets = tickets.reduce((acc, ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          const userName = user ? user.name : "Unassigned";
          if (!acc[userName]) {
            acc[userName] = [];
          }
          acc[userName].push(ticket);
          return acc;
        }, {});
        break;

      case "priority":
        const priorityNames = {
          4: "Urgent",
          3: "High",
          2: "Medium",
          1: "Low",
          0: "No priority",
        };
        groupedTickets = tickets.reduce((acc, ticket) => {
          const priorityName = priorityNames[ticket.priority];
          if (!acc[priorityName]) {
            acc[priorityName] = [];
          }
          acc[priorityName].push(ticket);
          return acc;
        }, {});
        break;

      default:
        groupedTickets = { "All Tickets": tickets };
    }

    Object.keys(groupedTickets).forEach((key) => {
      groupedTickets[key].sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groupedTickets;
  };

  return (
    <div className="app">
      <div className="app_navbar">
        <DisplayOptions
          grouping={grouping}
          sorting={sorting}
          onGroupingChange={handleGroupingChange}
          onSortingChange={handleSortingChange}
        />
      </div>
      <div className="app_outer">
        <div className="app_boards">
          {Object.entries(groupTickets()).map(([groupName, groupTickets]) => (
            <Board
              key={groupName}
              title={groupName}
              tickets={groupTickets}
              users={users}
              grouping={grouping}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
