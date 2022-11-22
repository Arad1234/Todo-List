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
  const [edit, setEdit] = useState<boolean>(false);
  const [hideEditButton, setHideEditButton] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(todo.mission);

  const handleDelete = async (id: number): Promise<void> => {
    const response = await axios.delete(
      `http://localhost:4444/todo/missions/${id}`
    );
    console.log(response.data);

    fetchData();
  };

  const updateCheckBox = async (id: number): Promise<void> => {
    try {
      await axios.patch(`http://localhost:4444/todo/missions/${id}`, {
        checkbox: checked,
      });

      fetchData();
    } catch (e) {
      console.log(e + " frontend Error");
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value.trim()) {
      setInputValue(event.target.value);
    }
  };

  const handleEdit = (): void => {
    setEdit(true);
    setHideEditButton(true);
  };

  const handleUpdateMissionName = async (id: number): Promise<void> => {
    if (todo.mission !== inputValue) {
      try {
        const response = await axios.patch(
          `http://localhost:4444/todo/missions/${id}`,
          {
            mission: inputValue,
          }
        );
        await fetchData();
      } catch (e) {
        console.log(e + " Frontend Error!");
      }
    }

    handleCancel();
  };

  const handleCancel = (): void => {
    setEdit(false);
    setHideEditButton(false);
  };

  useEffect(() => {
    updateCheckBox(todo._id);
  }, [checked]);

  return !hideEditButton ? (
    <div style={{ display: "flex", margin: "auto" }}>
      <button onClick={handleEdit}>Edit</button>
      <div className="main">
        <input
          className="checkboxInput"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />

        <div style={{ marginRight: 650, maxWidth: 25 }}>
          <h3 style={{ whiteSpace: "nowrap" }}>
            {checked ? <del>{todo.mission}</del> : todo.mission}
          </h3>
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
  ) : (
    <div style={{ margin: "auto" }}>
      <button onClick={() => handleUpdateMissionName(todo._id)}>Update</button>
      <button onClick={handleCancel}>Cancel</button>
      <input
        type="text"
        defaultValue={todo.mission}
        style={{ width: "35rem" }}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Mission;
