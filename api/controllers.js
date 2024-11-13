const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.SERVICE_ACCOUNT_TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  }),
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
