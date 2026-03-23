import express from "express"
import checkauth from "../middleware/checkauth"

const router = express.Router();

render.get("/", checkauth, (req,res) =>{
    res.render("profile", (User.req))
});

export default router;