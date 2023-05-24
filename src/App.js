import logo from "./logo.svg";
import "./App.css";
import { ListItem } from "./list-item";
import React, { useEffect, useState } from "react";
import { Button, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#5e4141",
        main: "#875D5E",
        dark: "#9f7d7e",
        contrastText: "#fff",
      },
      secondary: {
        light: "#5e4141",
        main: "#875D5E",
        dark: "#9f7d7e",
        contrastText: "#000",
      },
    },
  });

  const [idCount, setIdCount] = useState(0)

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter" && name.trim().length >= 1) {
      setIdCount(idCount + 1)
      e.preventDefault();
      console.log(idCount);
      setTodos([
        ...todos,
        {
          id: idCount,
          name,
          isChecked: false,
        },
      ]);
      setName("");
    }
  };

  const toggleCheckbox = (id) => {
    const newArr = [].concat(todos);
    newArr[id].isChecked = !newArr[id].isChecked;
    document.getElementsByClassName("list-item")[id].classList.toggle("done");
    console.log('чекнулся номер: ', id);
    setTodos(newArr);
  };

  function handleDeleteFactory(id) {
    return () => {
      const newList = [...todos];
      newList.splice(id, 1);
      setTodos(newList);
      console.log('удалился номер: ', id);
    };
  }

  useEffect(() => {
    if (todos.length >= 1) {
      document.getElementById("total-item").classList.add("active");
      document.getElementById("done-item").classList.add("active");
      document.getElementById("sort-item").classList.add("active");
    } else if (todos.length <= 0) {
      document.getElementById("total-item").classList.remove("active");
      document.getElementById("done-item").classList.remove("active");
      document.getElementById("sort-item").classList.remove("active");
    }
  }, [todos]);

  const [sortCount, setSortCount] = useState(0);

  const handleSort = () => {
    if (todos.filter((item) => item.isChecked === true).length >= 1) {
      setSortCount(sortCount + 1);
      let newArr = [...todos];
      if (sortCount == 0) {
        newArr.sort((a, b) => b.isChecked - a.isChecked);
      } else if (sortCount == 1) {
        newArr.sort((a, b) => b.isChecked - a.isChecked).reverse();
      } else if (sortCount == 2) {
        newArr.sort((a, b) => b.id - a.id);
      setSortCount(0);
      }
      console.log(sortCount);
      setTodos(newArr);
    }
  };

  // console.log(todos.sort((a, b) => b.isChecked - a.isChecked));

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <input
        type="text"
        value={name}
        placeholder="new..."
        onChange={(e) => setName(e.target.value)}
        onKeyDown={onKeyPressHandler}
      ></input>
      <div className="items-info">
      <div id="sort-item" className="sort-item">
          <ThemeProvider theme={theme}>
            <Button variant="outlined" color="primary" onClick={handleSort}>
              sort
            </Button>
          </ThemeProvider>
        </div>
        <div id="total-item" className="total-item active">
          Total: {todos.length}
        </div>
        <div id="done-item" className="done-item active ">
          Done: {todos.filter((item) => item.isChecked === true).length}
        </div>
      </div>
      <div className="list">
        {todos &&
          todos.map((item, index) => {
            return (
              <ListItem
                hendleDelete={handleDeleteFactory}
                id={index}
                toggleCheckbox={toggleCheckbox}
                key={item.id + item.name}
                name={item.name}
                isChecked={item.isChecked}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
