import { useState } from "react";
import reactLogo from "./assets/icons/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TodoApp } from "./components/todoApp";
import { Footer } from "./components/footer";

function App() {
  return (
    <>
      <TodoApp />
      <Footer />
    </>
  );
}

export default App;
