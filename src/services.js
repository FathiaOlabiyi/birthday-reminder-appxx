const Model = require("./model");

const collectInfo = async ({username, email, dob }) => {
  const existingEmail = await Model.findOne({ email });

  if (existingEmail) {
    throw new Error("Email already exist");
  }

  const collectUserInfo = await Model.create({username, email, dob});
  return collectUserInfo;
};

module.exports = {collectInfo}