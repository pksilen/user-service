const express = require("express");
const app = express();
const uuid = require("uuid");

app.use(express.json());

const users = [
  {
    id: uuid.v4(),
    firstName: "Petri",
    lastName: "Silen",
    streetAddress: "aa",
    zipCode: "aa",
    city: "aa",
    email: "pksilen@gmail.com",
    phoneNumber: "000",
  },
];

let isFirstGetRequest = true;

app.post("/users", (req, res) => {
  const user = { id: uuid.v4(), ...req.body };

  if (Math.random() < 0.75) {
    users.push(user);
  } else {
    res.status(500).json({ errorMessage: "User registration failed" });
  }

  res.json(user);
});

app.get("/users", (req, res) => {
  if (isFirstGetRequest) {
    isFirstGetRequest = false;
    setTimeout(() => {
      res.json(users);
    }, 3500);
  } else {
    res.json(users);
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
