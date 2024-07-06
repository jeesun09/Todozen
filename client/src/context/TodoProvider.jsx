import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <TodoContext.Provider value={{ user, setUser, todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export const TodoState = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
