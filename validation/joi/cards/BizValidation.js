import Joi from "joi";

const validateBizNumber = Joi.object({
  bizNumber: Joi.number().min(100000).max(9999999).required(),
});

const validateBizSchema = (bizNumber) => {
  return validateBizNumber.validateAsync(bizNumber);
};
export default validateBizSchema;
