import "./App.css";
import axios from "axios";
import { useState } from "react";
const React = require("react");

const App = () => {
  const [text, setText] = useState("")

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(text)

    setText(e.target.value)

  }
  const fetchData = async() => {
    try{
      const response = await axios.get("http://localhost:4444/todo/missions")
      console.log(response.data)
    }
    catch(e){
      console.log(e)
    }
  }

  const postData = async () => {
    const response = await axios.post("http://localhost:4444/todo/missions", {text:text});
    console.log(response)
  };


  return (
    <>
    <input type="text" onChange={handleInput} />
      <button onClick={postData}>post</button>
      <button onClick={fetchData}>get</button>
    </>
  );
};

export default App;
