const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bcrypt = require("bcrypt");

const app = express();

/* =========================
   MIDDLEWARE (IMPORTANT)
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   DB
========================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "digital_store_db"
});

db.connect((err) => {
  if (err) console.log("❌ DB error:", err);
  else console.log("✅ MySQL connected");
});

/* =========================
   FRONTEND
========================= */
app.use(express.static("FrontEnd"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd", "FenetreDemarage.HTML"));
});

/* =========================
   REGISTER
========================= */
app.post("/api/register", async (req, res) => {
  const { nom, prenom, email, password, telephone } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO utilisateur
    (nom, prenom, email, motDePasse, telephone, typeUtilisateur, dateInscription, estActif)
    VALUES (?, ?, ?, ?, ?, 'client', NOW(), 1)
  `;

  db.query(sql, [nom, prenom, email, hashedPassword, telephone], (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, message: "Erreur inscription" });
    }
    res.json({ success: true });
  });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM utilisateur WHERE email = ? AND estActif = 1";

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.json({ success: false, message: "Utilisateur introuvable" });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.motDePasse);

    if (!match) {
      return res.json({ success: false, message: "Mot de passe incorrect" });
    }

    res.json({
      success: true,
      user: {
        id: user.idUtilisateur,
        nom: user.nom,
        prenom: user.prenom,
        type: user.typeUtilisateur
      }
    });
  });
});

/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});