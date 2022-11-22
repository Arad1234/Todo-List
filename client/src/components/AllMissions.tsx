import Mission from "./Mission";

const React = require("react");

interface Todos {
  _id: number;
  mission: string;
  checkbox: boolean;
}
const AllMissions = (props: { mission: string; listOfTodos: Todos[] }) => {
  return (
    <>
      {props.listOfTodos.map((todo) => {
        return (
          <div key={todo._id}>
            <Mission todo={todo} />
          </div>
        );
      })}
    </>
  );
};

export default AllMissions;
