import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = (props) => {
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      if (props.onClose) props.onClose();
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    setIsDropdownOpen(true);
  });

  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      style={{
        position: "absolute",
        top: "100%",
        right: "0",
      }}
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
