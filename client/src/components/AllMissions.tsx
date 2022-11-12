import Mission from "./Mission";

const React = require("react");

const AllMissions = (props: { mission: string; listOfTodos: Array<any> }) => {
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
