const Service = require("../Model/service");

const services = async (req, res) => {
  try {
    const data = await Service.find({});

    if (!data || data.length === 0) {
      return res.status(404).json({ msg: "No services found!" });
    }

    res.status(200).json({ msg: data });
  } catch (error) {
    return res.status(500).json({ Error: "Services", error });
  }
};

module.exports = { services };
