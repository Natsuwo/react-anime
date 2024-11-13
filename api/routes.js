const express = require("express");
const router = express.Router();
const { getSignInToken } = require("./controllers");

router.post("/firebase-signin-token", getSignInToken);

module.exports = router;
