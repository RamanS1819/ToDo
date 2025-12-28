import express from "express";
import { register, getMyProfile, login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


// this is for creating new users
router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

// if we want to specially execute this route then it will else below (the dynamic one) will execute
// router.get("/userid/special", specialFunc);

/// try to always keep your dynamic route at the bottom
// /userid ---> static url hai itni
// /:id ----> dynamic url hai ye
// router.get("/userid/:id", getMyProfile);
router.get("/me", isAuthenticated, getMyProfile);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);

// //////// or ////////////
// router
//       .route("/userid/:id")
//       .get(getUserById)
//       .put(updateUser)
//       .delete(deleteUser);
// ////////////////////////

export default router;