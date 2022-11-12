import "../styles/Mission.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { GlobalContext } from "./AddMission";
const React = require("react");

interface todo {
  mission: string;
  _id: number;
}

const Mission = (props: { todo: todo }) => {
  const { todo } = props;
  const { fetchData } = GlobalContext();

  const handleDelete = async (id: number) => {
    const response = await axios.delete(
      `http://localhost:4444/todo/missions/${id}`
    );
    console.log(response.data);

    fetchData();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="main">
        <div style={{ paddingLeft: 10 }}>
          <h3>{todo.mission}</h3>
        </div>
        <div className="deleteMission" onClick={() => handleDelete(todo._id)}>
          <AiFillCloseCircle size={30} />
        </div>
      </div>
    </div>
  );
};

export default Mission;
