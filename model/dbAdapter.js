import connectToMongo from "./mongodb/dbConnect.js";
// import connectToMySQL from "./mysql/dbConnect.js";
import {
  createUserMongo,
  deleteUserMongo,
  getUserByEmailMongo,
  patchIsBizMongo,
  updateUserMongo,
  getAllUsersMongo,
  getUserByIdMongo,
  createUserGMongo,
} from "./mongodb/users/userService.js";
import {
  createCardMongo,
  getCardByBizNumberMongo,
  getAllCardsMongo,
  getCardByIdMongo,
  getAllMyCardsMongo,
  updateCardMongo,
  deleteCardMongo,
  updateLikeCardMongo,
} from "./mongodb/cards/cardService.js";
import normalizeUser from "./../normalize/user.normalize.js";
import normalizeCards from "../normalize/card.normalize.js";

const DB = "mongo";

const connectToDb = () => {
  if (DB === "mongo") {
    return connectToMongo();
  }
};
const getAllUsers = (user) => {
  if (DB === "mongo") {
    return getAllUsersMongo();
  }
};

const createUser = (user) => {
  user = normalizeUser(user);
  if (DB === "mongo") {
    return createUserMongo(user);
  }
};

const createUserGoogle = (user) => {
  user = normalizeUser(user);

  if (DB === "mongo") {
    return createUserGMongo(user);
  }
};

const updateUser = (id, user) => {
  user = normalizeUser(user);
  if (DB === "mongo") {
    return updateUserMongo(id, user);
  }
};

const getUserByEmail = (email) => {
  if (DB === "mongo") {
    return getUserByEmailMongo(email);
  }
};
const getUserById = (id) => {
  if (DB === "mongo") {
    return getUserByIdMongo(id);
  }
};

const deleteUser = (id) => {
  if (DB === "mongo") {
    return deleteUserMongo(id);
  }
};

const patchIsBiz = (id, isBusiness) => {
  if (DB === "mongo") {
    return patchIsBizMongo(id, isBusiness);
  }
};

const createCard = async (card) => {
  card = await normalizeCards(card);
  if (DB === "mongo") {
    return createCardMongo(card);
  }
};

const getCardByBizNumber = (bizNumber) => {
  if (DB === "mongo") {
    return getCardByBizNumberMongo(bizNumber);
  }
};

const getAllCards = () => {
  if (DB === "mongo") {
    return getAllCardsMongo();
  }
};

const getCardById = (id) => {
  if (DB === "mongo") {
    return getCardByIdMongo(id);
  }
};

const getAllMyCards = (user_id) => {
  if (DB === "mongo") {
    return getAllMyCardsMongo(user_id);
  }
};
const updateCard = (user_id, card) => {
  if (DB === "mongo") {
    return updateCardMongo(user_id, card);
  }
};
const updateLikeCard = (card_id, likes) => {
  if (DB === "mongo") {
    return updateLikeCardMongo(card_id, likes);
  }
};
const deleteCard = (id) => {
  if (DB === "mongo") {
    return deleteCardMongo(id);
  }
};

export default connectToDb;
export {
  createUser,
  createCard,
  getCardByBizNumber,
  getAllCards,
  getUserByEmail,
  updateUser,
  deleteUser,
  patchIsBiz,
  getCardById,
  getAllMyCards,
  updateCard,
  deleteCard,
  updateLikeCard,
  getAllUsers,
  getUserById,
  createUserGoogle,
};
