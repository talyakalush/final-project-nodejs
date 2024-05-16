import {
  createCard,
  getAllCards,
  getAllMyCards,
  getCardById,
  updateCard,
  updateLikeCard,
  deleteCard,
  getCardByBizNumber,
} from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";

const getAllCardsController = async (req, res) => {
  try {
    let cards = await getAllCards();
    res.json(cards);
  } catch (err) {
    console.log(err);
  }
};
const getCardByIdController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    res.json(card);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const getMyCardsController = async (req, res) => {
  const userId = req.userData._id;
  try {
    let myCards = await getAllMyCards(userId);
    return res.json(myCards);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const createCardController = async (req, res) => {
  try {
    const userId = req.userData._id;
    req.body.user_id = userId;
    let newCard = await createCard(req.body);
    return res.json(newCard);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const updateCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    console.log("cardFromDb", cardFromDb);

    let { user_id } = cardFromDb;

    user_id = user_id + "";
    if (!cardFromDb) {
      throw new Error("Card not found");
    }

    if (!req.userData.isAdmin) {
      if (req.userData._id !== user_id) {
        throw new Error(
          "You are not allowed to update this card. Only the card owner or system administrators are authorized."
        );
      }
    }

    const updatedCard = await updateCard(req.params.id, req.body);
    return res.json(updatedCard);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const patchLikeController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let likes = [...cardFromDb.likes];
    if (likes.includes(req.userData._id)) {
      likes = likes.filter((id) => id !== req.userData._id);
    } else {
      likes.push(req.userData._id);
    }
    const updatedCardFromDb = await updateLikeCard(req.params.id, likes);
    console.log("updatedCardFromDb", updatedCardFromDb);
    return res.json(updatedCardFromDb);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const patchBizNumberController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    const existingCard = await getCardByBizNumber(req.body.bizNumber);
    if (existingCard) {
      handleError(res, 400, "Card with this bizNumber already exists");
    } else {
      cardFromDb.bizNumber = req.body.bizNumber;
      let updatedCard = await updateCard(req.params.id, cardFromDb);
      return res.json(updatedCard);
    }
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const deleteCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let { user_id } = cardFromDb;
    user_id = user_id + "";
    if (user_id !== req.userData._id && !req.userData.isAdmin) {
      throw new Error(
        "You are not allowed to delete this card, you must be the owner of the card"
      );
    }
    const cardAfterDeleteFromDb = await deleteCard(req.params.id);
    return res.json(cardAfterDeleteFromDb);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

export {
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  createCardController,
  updateCardController,
  patchBizNumberController,
  deleteCardController,
  patchLikeController,
};
