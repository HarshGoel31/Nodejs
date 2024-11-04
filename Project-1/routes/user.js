const express = require("express");
const {
  handleGetAllUser,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  handleGetUserById,
} = require("../controllers/user");

const router = express.Router();

router.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const htmlData = `<ul>${allDbUsers
    ?.map((user, idx) => {
      return `<li>${user?.first_name} - ${user.email}</li>`;
    })
    .join("")}</ul>`;
  return res.send(htmlData);
});

router.route("/").get(handleGetAllUser).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
