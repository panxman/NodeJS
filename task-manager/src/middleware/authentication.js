const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    try {
        // Get Authorization Header, remove the unnecessary part and keep the TOKEN
        const token = req.header("Authorization").replace("Bearer ", "");
        // Decode it using JWT library
        const decoded = jwt.verify(token, "thisismysecretcode");
        console.log(decoded);
        // Find user with the ID from the Token's payload, that also has saved the same Token to the DB.
        // (because it might have expired)
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
        
        if (!user) {
            throw new Error();
        }

        // Save the user into the Request, so we can use it later on the Routers.
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
}

module.exports = auth;