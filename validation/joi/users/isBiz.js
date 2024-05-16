import Joi from "joi";

const objectBizSchema = Joi.object({
  isBusiness: Joi.boolean().required(),
});

const validateObjectBizSchema = (isBusiness) => {
  return objectBizSchema.validateAsync(isBusiness);
};

export default validateObjectBizSchema;
