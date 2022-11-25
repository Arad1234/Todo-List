import "./App.css";
import AddMission from "./components/AddMission";
import CurrentDate from "./components/CurrentDate";
const React = require("react");

const App = () => {
  return (
    <>
      <CurrentDate />
      <AddMission />
    </>
  );
};

export default App;
