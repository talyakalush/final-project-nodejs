// export default router;
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwksClient from "jwks-rsa";

const router = express.Router();
dotenv.config();
const client = jwksClient({
  jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      console.error("Error getting signing key:", err);
      return callback(err);
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    console.log("Signing key received:", signingKey);
    console.log("Algorithm:", header.alg);

    callback(null, signingKey);
  });
}

router.get("/", async (req, res) => {
  const { code } = req.query;
  const redirectUrl = "http://localhost:3031/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    jwt.verify(
      tokens.id_token,
      getKey,

      { algorithms: ["RS256"] },

      async (err, decoded) => {
        if (err) {
          console.error("JWT verification error", err);
          return res.status(401).json({ error: "Failed to verify ID Token" });
        }
        console.log("Decoded JWT:", decoded);

        res.redirect(
          `http://localhost:3000/callback#id_token=${tokens.id_token}`
        );
      }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
