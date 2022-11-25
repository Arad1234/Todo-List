import { useState, useEffect } from "react";
const React = require("react");

const CurrentDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return <h3 style={{ textAlign: "left" }}>{date.toLocaleString()}</h3>;
};

export default CurrentDate;
