const jwt = require("jsonwebtoken");
const User = require("../Model/user");

// get jwt token from user machine and verify with secret key ---
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, token has not been provided" });
    }

    const jwtToken = token.replace("Bearer","").trim();

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
        if (!userData) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

module.exports = authMiddleware;
