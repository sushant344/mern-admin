const Contact = require("../Model/contact");

const contact = async(req, res)=>{
    try {
        const response = req.body;
        const data = await Contact.create(response);
        console.log("contact data:", response)

        if(!data){
            return res.status(401).json({ msg: "Error while sending message, Try again" })
        }
        return res.status(201).json({ msg: "Message sent successfully" })
    } catch (error) {
        return res.status(500).json({ Error: "Internal server error" });
    }
}

module.exports = {
    contact
};