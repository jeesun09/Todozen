import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Todo from "./pages/Todo";
import TodoProvider from "./context/TodoProvider";

const App = () => {
  return (
    <div
      style={{
        maxWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom, #E0FBE2, #ACE1AF)",
        backgroundSize: "cover",
        color: "black",
      }}
    >
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </TodoProvider>
    </div>
  );
};

export default App;
