const Services = require("./services");
const Joi = require("./middleware");

const collectInfoControllerApi = async(req, res) => {
    try {
        const {value, error} = Joi.userInfo.validate(req.body);

        if(error) {
            return res.status(400).json({error: error.message});
        }

        if(value) {
            const response = await Services.collectInfo(value);
            return res.status(201).json({message: "User Info collected successfully", data: response});
        }
    }catch(error){

        if(error & error.message.includes("exists")){
            return res.status(409).json({error: error.message})
        }
        return res.status(500).json({message: "Internal server error", error: error.message})
    };
}

const collectInfoControllerWeb = async (req, res) => {
  try {
    const { value, error } = Joi.userInfo.validate(req.body);

    if (error) {
      return res.status(400).render("index", {success: null, error: error.message });
    }

    if (value) {
      const response = await Services.collectInfo(value);
      return res
        .status(201)
        .render("index", {success: "User registered Successfully", error: null})
    }
  } catch (error) {
    if (error & error.message.includes("exists")) {
      return res.status(409).render("index", {success: null, error: error.message});
    }
    return res
      .status(500)
      .render("index", 
        {success: null, message: "Internal server error, please try again later", error: error.message})
  }
};



module.exports = {collectInfoControllerApi, collectInfoControllerWeb};