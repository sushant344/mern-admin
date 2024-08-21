const User = require("../Model/user");

const register = async(req, res, next)=>{
    try {
        const { username, email, phone, password } = req.body;
        const userExists = await User.findOne({email});
    
        if(userExists){
            return res.status(400).json({ message: "Email already exist" })
        }
    
        const data = await User.create({
            username, email, phone, password
        })
        return res.status(201).json({
            message: "Registration successful", 
            token: await data.generateToken(),
            userId: data._id.toString()
        })
    } catch (error) {
        next(error);
    }
}


const login = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({email});
    
        if(!userExists){
            return res.status(400).json({ message: "Invalid email or password" })
        }
    
        // compare password function -
        const user = await userExists.comparePassword(password);

        if(user){      
            return res.status(200).json({
                message: "Login successfully", 
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            })
        }else{
            return res.status(401).json({message: "Invalid email or password"})
        }

    } catch (error) {
        return res.status(500).json({ Error: "Internal server error" })
    }
}


// get user by verifying jwt token --
const user = async(req, res) =>{
    try {
        const userData = req.user;
        return res.status(200).json({userData});
    } catch (error) {
        console.log("get user data:", error);
    }
}

module.exports = {
    register,
    login,
    user
}