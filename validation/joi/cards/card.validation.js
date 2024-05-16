import Joi from "joi";

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .max(500)
    .required(),
  web: Joi.string()
    .uri({ scheme: ["http", "https", "data"] })
    .required(),

  image: Joi.object().keys({
    url: Joi.string()
      .uri({ scheme: ["http", "https", "data"] })
      .min(14)
      .allow(""),

    alt: Joi.string().min(2).max(256).allow(""),
  }),
  price: Joi.number().min(1).max(100000000000000).required(),

  area: Joi.string().min(2).max(256).required(),
  style: Joi.string().min(2).max(256).required(),
  type: Joi.string().min(2).max(256).required(),
});

const createCardSchemaValidation = (cardInput) => {
  return createCardSchema.validateAsync(cardInput);
};
export default createCardSchemaValidation;
