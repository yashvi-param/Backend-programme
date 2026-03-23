import express from "express";
import passport from "passport";
import HttpError from "../middleware/HttpError.js";

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
  {failureRedirect: "/",}
), (req, res) => {
  res.redirect("this is callback url");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(new HttpError("Failed to log out", 500));
    }

    // Optionally destroy session
    req.session?.destroy((sessionErr) => {
      if (sessionErr) {
        return next(new HttpError("Failed to destroy session", 500));
      }
      res.redirect("/");
    });
  });
});

export default router;

