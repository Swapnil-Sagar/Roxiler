import "./App.css";
import React, { useState } from "react";
import Todo from "./components/Todo";
import UserData from "./components/UserData";
const axios = require("axios");

function App() {
  const [user, setUser] = useState("");
  const [taskId, setTaskId] = useState(1);
  const URL = `https://jsonplaceholder.typicode.com/users/${taskId + 1}`;

  const fetchData = async () => {
    const response = await axios.get(URL);
    const data = JSON.stringify(
      [response.data.id, response.data.name, response.data.email],
      null
    );

    setUser(data);
  };

  function getTaskId(item) {
    setTaskId(item);
  }

  console.log("parent mein task id", taskId + 1);

  var array = user.split(",");
  //console.log(user);
  //console.log(array);
  return (
    <div className="App">
      <Todo
        taskId={taskId}
        getTaskId={getTaskId.bind(this)}
        fetchData={fetchData}
      />
      <UserData array={[...array]} fetchData={fetchData} />
    </div>
  );
}

export default App;
