import User from "./User.js";
import UserGoogle from "./UserGoogle.js";

const createUserMongo = (userData) => {
  let user = new User(userData);
  return user.save();
};

const createUserGMongo = (userDate) => {
  let useg = new UserGoogle(userDate);
  return useg.save();
};

const getAllUsersMongo = () => {
  return User.find({}, { password: 0 });
};

const getUserByIdMongo = (id) => {
  return User.findById(id, { password: 0 });
};

const getUserByEmailMongo = (email) => {
  return User.findOne({ email });
};

const updateUserMongo = (id, userData) => {
  return User.findByIdAndUpdate(id, userData, { new: true });
};

const patchIsBizMongo = (id, isBusiness) => {
  return User.updateOne({ _id: id }, { isBusiness: isBusiness });
};

const deleteUserMongo = (id) => {
  return User.findByIdAndDelete(id);
};

export {
  createUserMongo,
  getAllUsersMongo,
  getUserByIdMongo,
  getUserByEmailMongo,
  updateUserMongo,
  deleteUserMongo,
  patchIsBizMongo,
  createUserGMongo,
};
