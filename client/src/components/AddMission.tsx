import axios from "axios";
import { useEffect, useState, useContext, createContext } from "react";
import "../styles/AddMission.module.scss";
import AllMissions from "./AllMissions";
const React = require("react");

const ctx = createContext(null);

const AddMission = () => {
  const [missionName, setMissionName] = useState<string>("");
  const [listOfTodos, setListOfTodos] = useState<object[]>([]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissionName(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4444/todo/missions");
      setListOfTodos(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postData = async () => {
    if (missionName.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:4444/todo/missions",
          {
            mission: missionName,
          }
        );
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
    setMissionName("");

    fetchData();
  };

  return (
    <>
      <h1>Todo List</h1>
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <input
          value={missionName}
          type="text"
          onChange={handleInput}
          placeholder="New Task"
          style={{ paddingLeft: 10 }}
        />
        <button onClick={postData}>Add</button>
      </div>
      <ctx.Provider value={{ fetchData }}>
        <AllMissions mission={missionName} listOfTodos={listOfTodos} />
      </ctx.Provider>
    </>
  );
};
export const GlobalContext = () => {
  return useContext(ctx);
};
export default AddMission;
