const User = require("../models/user");

const handleGetAllUser = async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "No User Found" });
  return res.status(200).json(user);
};

const handleUpdateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const user = await User.findByIdAndUpdate(id, body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run on updates
    });
    if (user) {
      return res.json({ status: "Success", id: id });
    } else {
      res.json({ msg: "No user found with this id !!" });
    }
  } catch (err) {
    if (err instanceof mongoose.CastError && err.path === "_id") {
      console.error("Invalid ObjectId:", err.value);
      res.json({ msg: "No user found with this id !!" });
      return null; // Or handle the error differently
    }

    console.error("Error updating user:", err);
    throw err; // Or handle the error in a suitable way
  }
};

const handleDeleteUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    return res.json({ status: "Success", id: id });
  } else {
    res.status(404).json({ msg: "No user found with this id !!" });
  }
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    res.status(400).json({ msg: "All fields are required !!" });
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.email,
    job_title: body.job_title,
  });
  return res.status(201).json({ msg: "success", id: result._id });
};

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
