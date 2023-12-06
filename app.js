const express = require("express");
const connectionDatabase = require("./conn");
const User = require("./model/User");
const app = express();
app.use(express.json());
connectionDatabase();

//router routes
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users)
      return res
        .status(404)
        .send({ status: fase, message: "database Is Empty" });
    return res.status(200).send({ status: true, message: users });
  } catch (err) {
    console.log("ERRORT AT Reading Users", err);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExits = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (userExits) {
      if (userExits.username == username.toLowerCase()) {
        return res.status(400).send("This Username already teked!");
      } else if (userExits.email == email.toLowerCase()) {
        return res.status(400).send("This Email already teked!");
      }
    }

    const user = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
    });
    await user.save();
    return res.status(201).send({status: true, message:"Successfully Registered"});
  } catch (err) {
    console.log("ERRORT AT Creating Users");
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExits = await User.findById(req.params.id);

    if (!userExits) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res
      .status(201)
      .send({ status: true, message: "Successfully Updated" });
  } catch (err) {
    console.log("ERRORT AT Updating Users", err);
  }
});
app.delete("/users/:id", async (req, res) => {
  try {

    const userExits = await User.findById(req.params.id);

    if (!userExits) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    return res
      .status(201)
      .send({ status: true, message: "Successfully Deleted" });
  } catch (err) {
    console.log("ERRORT AT Deleting Users", err);
  }
});
app.listen(3000, () => {
  console.log("Server is listening on 3000");
});
