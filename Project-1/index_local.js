const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const PORT = 8001;

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `${Date.now()}: ${req.method} ${req.path}\n`,
    (err, data) => {
      if (err) return res.end(err);
      next();
    }
  );
});

app.get("/api/users", (req, res) => {
  // res.setHeader(key,value)
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = req.params.id;
    let user = users.find((user) => user.id === parseInt(id));
    if (!user) return res.status(404).json({ msg: "No User Found" });
    return res.status(200).json(user);
  })
  .patch((req, res) => {
    //todo: Update a user
    const id = req.params.id;
    const body = req.body;
    const userIndex = users.findIndex((user) => user?.id === parseInt(id));
    Object.keys(body)?.map((key) => {
      users[userIndex][key] = body[key];
    });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res.send(err);
      }
      return res.json({ status: "Success", id: id });
    });
  })
  .delete((req, res) => {
    //todo: Delete a user
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user?.id === parseInt(id));
    if (userIndex !== -1) {
      const updatedUsers = users.filter((user) => user?.id !== parseInt(id));
      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(updatedUsers),
        (err, data) => {
          if (err) {
            return res.send(err);
          }
          return res.json({ status: "Success", id: id });
        }
      );
    } else {
      return res.status(404).json({ msg: "No User Found" });
    }
  });

app.post("/api/users", (req, res) => {
  //todo: Create a new user
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server started at Port:${PORT}`);
});

// app.get("/users", (req, res) => {
//   const htmlData = `<ul>${users
//     ?.map((user, idx) => {
//       return `<li>${user?.first_name}</li>`;
//     })
//     .join("")}</ul>`;
//   return res.send(htmlData);
// });
