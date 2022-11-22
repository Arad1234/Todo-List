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
  const [checked, setChecked] = useState<boolean>(todo.checkbox);
  const [edit, setEdit] = useState(false);
  const [hideEditButton, setHideEditButton] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleDelete: (id: number) => Promise<void> = async (id: number) => {
    const response = await axios.delete(
      `http://localhost:4444/todo/missions/${id}`
    );
    console.log(response.data);

    fetchData();
  };

  const updateBoolean: (id: number) => Promise<void> = async (id: number) => {
    try {
      await axios.patch(`http://localhost:4444/todo/missions/${id}`, {
        checkbox: checked,
      });
      fetchData();
    } catch (e) {
      console.log(e + " frontend Error");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEdit = () => {
    setEdit(true);
    setHideEditButton(true);
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.patch(`http://localhost:4444/todo/missions/${id}`, {
        mission: inputValue,
      });
      await fetchData();
      handleCancel();
    } catch (e) {
      console.log(e + "Frontend Error!");
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setHideEditButton(false);
  };

  useEffect(() => {
    updateBoolean(todo._id);
  }, [checked]);

  return (
    <div style={{ display: "flex" }}>
      {!hideEditButton ? (
        <button onClick={handleEdit}>Edit</button>
      ) : (
        <div>
          <button onClick={() => handleUpdate(todo._id)}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <div className="main">
        <input
          className="checkboxInput"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div style={{ marginRight: 650, maxWidth: 25 }}>
          {!edit ? (
            <h3 style={{ whiteSpace: "nowrap" }}>
              {checked ? <del>{todo.mission}</del> : todo.mission}
            </h3>
          ) : (
            <input
              type="text"
              defaultValue={todo.mission}
              style={{ width: "35rem" }}
              onChange={handleInputChange}
            />
          )}
        </div>
        <div className="deleteMission" onClick={() => handleDelete(todo._id)}>
          <AiOutlineClose
            style={{
              marginTop: 4,
              marginRight: 3,
              marginLeft: 3,
            }}
            size={25}
            color="white"
          />
        </div>
      </div>
    </div>
  );
};

export default Mission;
