import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid";
import { Input } from "@mui/material";
import { useState, useEffect, useMemo, useContext } from "react";
import { TodoContext } from "../Context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

const notify = () => toast("تم اضافه المهمه!");

export default function ToDoList() {
  const { todos, settodos } = useContext(TodoContext);
  const [displayMetionsType, setdisplayMetionsType] = useState("all");
  const [titleinput, settitleinput] = useState("");

  // فلترة المهام
  const completedtodos = useMemo(() => {
    return todos.filter((t) => t.iscompleted);
  }, [todos]);

  const noncompletedtodos = useMemo(() => {
    return todos.filter((t) => !t.iscompleted);
  }, [todos]);

  // تحديد المهام التي سيتم عرضها
  let TodosToBeRender = todos;
  if (displayMetionsType === "completed") {
    TodosToBeRender = completedtodos;
  } else if (displayMetionsType === "non-completed") {
    TodosToBeRender = noncompletedtodos;
  }

  const todosma = TodosToBeRender.map((t) => <ToDo key={t.id} todo={t} />);

  // إضافة مهمة جديدة
  function handelclick() {
    const newtodo = {
      id: uuidv4(),
      title: titleinput,
      desc: "",
      iscompleted: false,
    };
    const uptodos = [...todos, newtodo];
    settodos(uptodos);
    localStorage.setItem("todos", JSON.stringify(uptodos));
    settitleinput("");
    notify();
  }

  // استرجاع المهام من localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem("todos");
      if (data) {
        const storagetodos = JSON.parse(data);
        if (Array.isArray(storagetodos)) {
          settodos(storagetodos);
        } else {
          console.warn("Invalid data in localStorage, resetting to []");
          settodos([]);
          localStorage.setItem("todos", JSON.stringify([]));
        }
      } else {
        settodos([]);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      settodos([]);
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);

  // تغيير نوع الفلترة
  function handleAlignment(e) {
    setdisplayMetionsType(e.target.value);
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", textAlign: "center" }}
          >
            مهامي
          </Typography>
          <Divider flexItem />
          {/* الفلترة */}
          <ToggleButtonGroup
            value={displayMetionsType}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              direction: "ltr",
            }}
          >
            <ToggleButton value="non-completed">الغير منجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {/* عرض المهام */}
          {todosma}

          {/* إدخال مهمة جديدة */}
          <Grid container spacing={0.5} style={{ marginTop: "10px" }}>
            <Grid size={8}>
              <Input
                placeholder="عنوان المهمه "
                style={{
                  width: "100%",
                  border: "solid Black 2px",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                value={titleinput}
                onChange={(e) => settitleinput(e.target.value)}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  padding: "10px",
                }}
                onClick={handelclick}
                disabled={titleinput.length === 0}
              >
                أضافة المهمه
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Toaster position="bottom-center" />
    </Container>
  );
}
