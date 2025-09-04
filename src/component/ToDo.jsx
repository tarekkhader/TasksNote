import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
// icons
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { TodoContext } from "../Context/TodoContext";
import { useContext, useState } from "react";
//imports for dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function ToDo({ todo }) {
  const [shwodeletedialog, setshwodeletedialog] = useState(false);

  const { todos, settodos } = useContext(TodoContext);
  // handel isCompleted t/f
  const handelcheckclick = () => {
    const todoupdates = todos.map((t) => {
      if (t.id === todo.id) {
        t.iscompleted = !t.iscompleted;
      }
      return t;
    });
    settodos(todoupdates);
    localStorage.setItem("todos", JSON.stringify(todoupdates));
  };
  // ===handel isCompleted t/f
  //handel delete
  function handelcheckdelete() {
    setshwodeletedialog(true);
  }
  function handleClose() {
    setshwodeletedialog(false);
  }
  function handeldeleteconfirme() {
    const todosupdate = todos.filter((t) => {
      return t.id !== todo.id;
    });
    settodos(todosupdate);
    localStorage.setItem("todos", JSON.stringify(todosupdate));
  }
  // handel update
  const [shwoupdatedialog, setshwoupdatedialog] = useState(false);
  const [updatedtodo, setupdatedtodo] = useState({
    title: todo.title,
    desc: todo.desc,
  });

  function handleupdateClose() {
    setshwoupdatedialog(false);
  }
  function handelupdateconfirme() {
    const upto = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedtodo.title, desc: updatedtodo.desc };
      } else {
        return t;
      }
    });
    settodos(upto);
    setshwoupdatedialog(false);
    localStorage.setItem("todos", JSON.stringify(upto));
  }
  function handelupdateicon() {
    setshwoupdatedialog(true);
  }

  return (
    <>
      {/*  dialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={shwodeletedialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من رغبتك ف حذف المهمه !؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء الحذف</Button>
          <Button onClick={handeldeleteconfirme} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog */}
      {/* updateDialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={shwoupdatedialog}
        onClose={handleupdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمه</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            label="عنوان المهمه"
            fullWidth
            variant="standard"
            value={updatedtodo.title}
            onChange={(e) => {
              setupdatedtodo({ ...updatedtodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedtodo.desc}
            onChange={(e) => {
              setupdatedtodo({ ...updatedtodo, desc: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleupdateClose}>الغاء التعديل</Button>
          <Button onClick={handelupdateconfirme} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== updateDialog */}

      <Card
        className="todocard"
        sx={{ minWidth: 275 }}
        style={{
          marginTop: "10px",
          backgroundColor: "#283593",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "rigth",
                  textDecoration: todo.iscompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "rigth" }}>
                {todo.desc}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <IconButton
                className="IconButton"
                aria-label="delete"
                style={{
                  color: todo.iscompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.iscompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a ",
                }}
                onClick={handelcheckclick}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handelupdateicon}
                className="IconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa ",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                className="IconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "solid #b23c17 ",
                }}
                onClick={handelcheckdelete}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
