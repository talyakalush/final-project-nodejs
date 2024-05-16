import { createUser, createCard } from "../model/dbAdapter.js";
import generateUniqueNumber from "../utils/generateUniqueNumber.js";

const initialUsers = async () => {
  let users = [
    {
      name: {
        first: "kenny",
        last: "mc",
      },
      phone: "0500000000",
      email: "kenny@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: false,
      isAdmin: false,
    },
    {
      name: {
        first: "john",
        last: "wick",
      },
      phone: "0500000000",
      email: "john@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: true,
      isAdmin: true,
    },
    {
      name: {
        first: "james",
        last: "bond",
      },
      phone: "0500000000",
      email: "james@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: true,
      isAdmin: false,
    },
  ];
  try {
    let bizId = "";
    for (let user of users) {
      let userFromDb = await createUser(user);
      if (!user.isAdmin && user.isBusiness) {
        bizId = userFromDb._id;
      }
    }
    return bizId;
  } catch (err) {
    return "";
  }
};

const initialCards = async (bizId) => {
  let cards = [
    {
      title: "yaniv-dj",
      subtitle: "yaniv",
      description: "make you happy at your event",
      phone: "0547929000",
      email: "yaniv@gmail.com",
      web: "https://mail.google.com/",
      image: {
        url: "https://mastermixdj.com/app/uploads/2022/05/Square-Feature-3.jpg",
        alt: "dj",
      },
      price: 230,
      area: "north",
      style: "DJ",
      type: "DJ",

      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
    },
    {
      title: "Perfect memory!",
      subtitle: "adi",
      description:
        "If you feel like creating a perfect memory for your special event, con…",
      phone: "0547929000",
      email: "adiPhoto@gmail.com",
      web: "https://mail.google.com/",
      image: {
        url: "https://www.my-photo.co.il/images/itempics/uploads/media_1305201914052",
        alt: "camera",
      },
      price: 2000,
      area: "north",
      style: "nn",
      type: "photographer",

      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
    },
    {
      title: "Event Photographer",
      subtitle: "avi!",
      description: "For a perfect event with photos that are worth everything",
      phone: "0547929000",
      email: "aviphoto@gmail.com",
      web: "https://mail.google.com/",
      image: {
        url: "https://www.picshare.co.il/s_pictures/img76738.jpg",
        alt: "Business card image",
      },
      price: 1000,
      area: "jarusalem",
      style: "nice",

      type: "photographer",
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
    },
  ];
  try {
    for (let card of cards) {
      await createCard(card);
    }
  } catch (err) {
    console.log(err);
  }
};

export { initialUsers, initialCards };
