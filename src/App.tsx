import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
const React = require("react");

const App = () => {
  const updateData = async () => {
    const response = await axios.put("http://172.20.32.1:4444/things/peoples", {
      number: count,
    });
    console.log(response.data);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    updateData();
  }, [count]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      {count}
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
};

export default App;
