const joi = require("joi").extend(require("@joi/date"));

const userInfo = joi.object({
  username: joi.string().lowercase().required(),

  email: joi
    .string()
    .email()
    .lowercase()
    .required()
    .messages({ "string.email": "Email must be a valid email" }),

  dob: joi
    .date()
    .format("YYYY-MM-DD")
    .min("1900-01-01")
    .max("now")
    .required()
    .messages({
      "date.format": "The date format must be in YYYY-MM-DD",
      "date.min": "Year cannot be before 1900",
      "date.max": "Date of birth cannot be in the future"
    }),
});

module.exports = {userInfo}