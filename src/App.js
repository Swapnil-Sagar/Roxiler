import "./App.css";
import React, { useState } from "react";
import Todo from "./components/Todo";
import UserData from "./components/UserData";
const axios = require("axios");

function App() {
  const [user, setUser] = useState("");
  const URL = "https://jsonplaceholder.typicode.com/users/1";

  const fetchData = async () => {
    const response = await axios.get(URL);
    const data = JSON.stringify(
      [response.data.id, response.data.name, response.data.email],
      null
    );

    setUser(data);
  };

  var array = user.split(",");
  console.log(user);
  console.log(array);
  return (
    <div className="App">
      <Todo fetchData={fetchData} />
      <UserData array={[...array]} fetchData={fetchData} />
    </div>
  );
}

export default App;
