const express = require("express");
const cors = require("cors");

const app = express();

const TODOs = require("./db");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200"
  })
);

app.get("/data", (req, res) => {
  res.status(200).json(TODOs);
});

app.post("/data", (req, res) => {
  if (req.body) {
    TODOs.push(req.body);
    res.status(200).json({message: 'Add Todo successful!'});
  }
});

app.put("/data/:id", (req, res) => {
  const id = req.params["id"];
  const { content, isDone } = req.body;
  // TODOs[id] = {
  //   ...TODOs[id],
  //   ...req.body
  // }
  const findTodo = TODOs.find(todo => todo.id === id);
  if (findTodo) {
    findTodo.content = content;
    findTodo.isDone = isDone;
    res.status(200).json({ message: "Update successfully!" });
  }
});

app.delete("/data/:id", (req, res) => {
  const id = req.params["id"];
  TODOs.find((val, index) => {
    if (val.id === id) {
      TODOs.splice(index, 1);
      res.status(200).json({ message: "Delete successful!" });
    }
  });
});

app.listen(3000, () => {
  console.log("HTTP REST API Server running on port 3000");
});
