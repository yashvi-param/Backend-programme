import httperror from "../middleware/HttpError.js"
import express from "express"

const router = express.Router()

const checkAuth = async (req, res, next) => {
    if (!req.user){
        return next(new httperror("User not authenticated", 401));
    }
    next();
}

router.get("/profile", checkAuth, (req, res) => {
    res.render("profile", { user: req.user });
});

export default router;