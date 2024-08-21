const User = require("../Model/user");
const Contact = require("../Model/contact");

// get all users from DB ---
const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find({}, {password:0});
        if(!users){
            return res.status(404).json({message: "No user found!!"})
        }
        return res.status(200).json({users});
    } catch (error) {
        console.log("Admin users:", error); 
    }
}


// get user by id --
const getUserById = async(req, res)=>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id: id}, {password: 0});
        return res.status(200).json({message: data})
    } catch (error) {
        console.log("Edit user admin logic:", error);
    }
}


// update user data --
const updateUserById = async(req, res)=>{
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne({_id: id}, {
            $set: updateUserData
        })
        return res.status(200).json({message: "Updated successfully", updatedData})
    } catch (error) {
        next(error)
    }
}


// delete user by id --
const deleteUserById = async(req, res)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.log("Delete user admin logic:", error);
    }
}


// get all contacts from DB --
const getAllContacts = async(req, res)=>{
    try {
        const contacts = await Contact.find({});
        if(!contacts){
            return res.status(404).json({message: "No contacts found!!"})
        }
        return res.status(200).json({contacts});
    } catch (error) {
        console.log("Admin contacts:", error); 
    }
}


// delete contact by id ---
const deleteContactById = async(req, res)=>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({message: "Contact deleted successfully"})
    } catch (error) {
        console.log("Delete contact admin logic:", error);
    }
}



module.exports = {
    getAllUsers,
    getAllContacts,
    deleteUserById,
    getUserById,
    updateUserById,
    deleteContactById
}