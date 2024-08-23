// check if logged in user is abmin or not --
const adminMiddleware = async(req, res, next)=>{
    try {
        const adminRole = req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message: "Access denied, user is not an admin"})
        }
        next();
    } catch (error) {
        next(error);
    }
}


module.exports = adminMiddleware;