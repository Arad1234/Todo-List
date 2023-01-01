import axios from "axios";
import { useEffect, useState, useContext, createContext } from "react";
import "../styles/AddMission.scss";
import AllMissions from "./AllMissions";
import DeleteAllMission from "./DeleteAllMission";
const React = require("react");

const ctx = createContext(null);

interface Todos {
  _id: number;
  mission: string;
  checkbox: boolean;
}

const AddMission = () => {
  const [missionName, setMissionName] = useState<string>("");
  const [listOfTodos, setListOfTodos] = useState<Todos[]>([]);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissionName(event.target.value);
  };

  const fetchData = async (): Promise<void> => {
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

  const postData = async (): Promise<void> => {
    if (missionName.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:4444/todo/missions",
          {
            mission: missionName.trim(),
            checkbox: false,
          }
        );
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }

      fetchData();
    }
    setMissionName("");
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className="AddMissionField">
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
        <DeleteAllMission listOfTodos={listOfTodos} />
      </ctx.Provider>
    </>
  );
};
export const GlobalContext = () => {
  return useContext(ctx);
};
export default AddMission;
