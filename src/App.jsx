import ToDoList from "./component/ToDoList";
import { TodoContext } from "./Context/TodoContext";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

const them = createTheme({
  typography: { fontFamily: ["Alex"] },
});
const intialtodos = [];

function App() {
  const [todos, settodos] = useState(intialtodos);

  return (
    <ThemeProvider theme={them}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodoContext.Provider value={{ todos, settodos }}>
          <ToDoList />
        </TodoContext.Provider>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
