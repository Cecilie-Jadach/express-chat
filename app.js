//youtube video: https://www.youtube.com/watch?v=Hej48pi_lOc
import express from "express";
import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessageById,
  updateMessageByIdPatch,
  deleteMessageById,
} from "./database.js";

const app = express();
app.use(express.json());
const port = 8080;

app.get("/messages", async (req, res) => {
  const messages = await getMessages();
  res.send(messages);
});

app.get("/messages/:id", async (req, res) => {
  const id = req.params.id;
  const message = await getMessageById(id);
  res.send(message);
});

app.post("/messages", async (req, res) => {
  const { user, content } = req.body;
  const message = await createMessage(user, content);
  res.status(201).send(message);
});

app.put("/messages/:id", async (req, res) => {
  const { user, content } = req.body;
  const id = req.params.id;

  const updatedMessage = await updateMessageById(id, user, content);
  res.send(updatedMessage);
});

app.patch("/messages/:id", async (req, res) => {
  const { user, content } = req.body;
  const id = req.params.id;

  const updatedMessage = await updateMessageByIdPatch(id, user, content);

  res.send(updatedMessage);
});

app.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;

  const deleted = await deleteMessageById(id);

  if (!deleted) {
    return res.status(404).send({ error: "Message not found" });
  }

  res.status(204).send();
});

//https://expressjs.com/en/5x/guide/error-handling/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
