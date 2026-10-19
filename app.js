import express from "express";
import messages from "./data.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//create message
app.post("/messages", (req, res) => {
  console.log(req.body);

  const newMessage = {
    id: messages.length + 1,
    user: req.body.user,
    text: req.body.text,
    timestamp: req.body.timestamp,
  };

  messages.push(newMessage);

  res.status(201).json(messages);
});

//get all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

//get single message by id
app.get("/messages/:id", (req, res) => {
  console.log(req.params);

  const id = Number(req.params.id);

  const message = messages.find((m) => m.id === id);

  if (!message) {
    return res.status(404).json({ error: `Message with id ${id} not found` });
  }

  res.json(message);
});

//update message by id
app.put("/messages/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id, req.body);

  const message = messages.find((m) => m.id === id);

  if (!message) {
    return res.status(404).json({ error: `Message with id ${id} not found` });
  }

  message.user = req.body.user;
  message.text = req.body.text;
  message.timestamp = req.body.timestamp;

  res.json(messages);
});

//delete message by id
app.delete("/messages/:id", (req, res) => {
  const id = Number(req.params.id);

  const message = messages.findIndex((m) => m.id === id);

  if (message === -1) {
    return res.status(404).json({ error: `Message with id ${id} not found` });
  }

  messages.splice(message, 1);

  res.json(messages);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
