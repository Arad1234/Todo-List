import "../styles/Mission.scss";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { GlobalContext } from "./AddMission";
import { useEffect, useState } from "react";
const React = require("react");

interface todo {
  mission: string;
  _id: number;
  checkbox: boolean;
}

const Mission = (props: { todo: todo }) => {
  const { todo } = props;
  const { fetchData } = GlobalContext();
  const [checked, setChecked] = useState(todo.checkbox);
  const handleDelete = async (id: number) => {
    const response = await axios.delete(
      `http://localhost:4444/todo/missions/${id}`
    );
    console.log(response.data);

    fetchData();
  };

  const updateBoolean = async (id: number) => {
    try {
      await axios.patch(`http://localhost:4444/todo/missions/${id}`, {
        checkbox: checked,
      });
      fetchData();
    } catch (e) {
      console.log(e + " frontend Error");
    }
  };

  useEffect(() => {
    updateBoolean(todo._id);
  }, [checked]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="main">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div style={{ marginRight: 650, width: 20 }}>
          <h3 style={{ whiteSpace: "nowrap" }}>{todo.mission}</h3>
        </div>
        <div className="deleteMission" onClick={() => handleDelete(todo._id)}>
          <AiOutlineClose size={35} color="black" />
        </div>
      </div>
    </div>
  );
};

export default Mission;
