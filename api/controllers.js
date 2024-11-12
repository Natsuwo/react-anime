const admin = require("firebase-admin");
const serviceAccount = require("./firebase_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yureitv-8fded.firebaseio.com",
});

const getSignInToken = async (req, res) => {
  try {
    const userId = req.body.user_id;
    if (!userId) throw Error("Missing User ID");
    const userRecord = await admin.auth().getUser(userId);

    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    return res.status(200).json({ success: true, token: customToken });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return res
        .status(500)
        .json({ success: false, error: "User ID không tồn tại." });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getSignInToken };
