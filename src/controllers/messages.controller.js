import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
  const messages = await Message.find({
    sender: req.user.id
  }).populate('sender')
  res.json(messages);
};

export const createMessage = async (req, res) => {
  const { content, date } = req.body;

  const newMessage = new Message({
    sender: req.user.id,
    content,
    date,
  });
  const savedMessage = await newMessage.save();
  res.json(savedMessage);
};

export const deleteMessage = async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) return res.status(404).json({ message: "Message not found" });
  return res.sendStatus(204);
};

export const updateMessage = async (req, res) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!message) return res.status(404).json({ message: "Message not found" });
  res.json(message);
};
