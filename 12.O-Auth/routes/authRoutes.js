import express from "express";
import passport, { session } from "passport";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

router.get("/google/redirect", passport.authenticate("google",
  {failureRedirect: "/login",
  session: false}
), (req, res) => {
  res.send("this is callback url");
});

export default router;