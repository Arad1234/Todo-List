import { GlobalContext } from "./AddMission";
import axios from "axios";
import { useState } from "react";
const React = require("react");

const DeleteAllMission = (props: { listOfTodos: object[] }) => {
  const { fetchData, listOfTodos } = GlobalContext();

  const handleDeleteCollection = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:4444/todo/missions"
      );
      const data = response.data;
      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return props.listOfTodos.length ? (
    <button onClick={handleDeleteCollection}>Delete All Mission</button>
  ) : null;
};

export default DeleteAllMission;