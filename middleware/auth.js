const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {

        // Store user token
        const token = req.header("x-auth-token");

        // Deny authorisation
        if(!token) {
            return res
                .status(400)
                .json({ msg: "No authentication token - Authorisation Denied" })
        }

        // Successful auth
        const verified = jwt.verify(token, process.env.JWT_SECRET);

             // Validity Check
        if(!verified) return res
            .status(401).json({ msg: 'Token verification failed - Authorisation Denied' })

        req.user = verified.id;
        next();


    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = auth;
