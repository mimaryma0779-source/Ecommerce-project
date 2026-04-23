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
   GET PROFILE
========================= */
app.get("/api/profile/:id", (req, res) => {
  const sql = `
    SELECT u.idUtilisateur, u.nom, u.prenom, u.email, u.telephone,
           c.adresseLivraison, c.wilaya,
           cf.pointsTotal,
           nf.libelle AS niveauFidelite
    FROM utilisateur u
    LEFT JOIN client c ON c.idUtilisateur = u.idUtilisateur
    LEFT JOIN comptefidelite cf ON cf.idClient = u.idUtilisateur
    LEFT JOIN niveaufidelite nf ON nf.idNiveau = cf.idNiveau
    WHERE u.idUtilisateur = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err || !results.length)
      return res.json({ success: false, message: "Profil introuvable" });
    res.json({ success: true, profile: results[0] });
  });
});

/* =========================
   UPDATE PROFILE
========================= */
app.put("/api/profile/:id", async (req, res) => {
  const { nom, prenom, telephone, adresseLivraison, wilaya } = req.body;
  const sqlU = `UPDATE utilisateur SET nom=?, prenom=?, telephone=? WHERE idUtilisateur=?`;
  db.query(sqlU, [nom, prenom, telephone, req.params.id], (err) => {
    if (err) return res.json({ success: false, message: "Erreur mise à jour utilisateur" });
    const sqlC = `
      INSERT INTO client (idUtilisateur, adresseLivraison, wilaya)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE adresseLivraison=VALUES(adresseLivraison), wilaya=VALUES(wilaya)
    `;
    db.query(sqlC, [req.params.id, adresseLivraison, wilaya], (err2) => {
      if (err2) return res.json({ success: false, message: "Erreur mise à jour client" });
      res.json({ success: true });
    });
  });
});

/* =========================
   CHANGE PASSWORD
========================= */
app.put("/api/password/:id", async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 8)
    return res.json({ success: false, message: "Mot de passe trop court" });
  const hashed = await bcrypt.hash(newPassword, 10);
  db.query(
    "UPDATE utilisateur SET motDePasse=? WHERE idUtilisateur=?",
    [hashed, req.params.id],
    (err) => {
      if (err) return res.json({ success: false, message: "Erreur changement mot de passe" });
      res.json({ success: true });
    }
  );
});

/* =========================
   GET ORDERS
========================= */
app.get("/api/orders/:id", (req, res) => {
  const sql = `
    SELECT c.idCommande, c.statut, c.dateCommande, c.montantTotal,
           lc.quantite, lc.prixUnitaire, p.nom AS nomProduit
    FROM commande c
    JOIN lignecommande lc ON lc.idCommande = c.idCommande
    JOIN produit p ON p.idProduit = lc.idProduit
    WHERE c.idClient = ?
    ORDER BY c.dateCommande DESC
  `;
  db.query(sql, [req.params.id], (err, rows) => {
    if (err) return res.json({ success: false });
    // Grouper les lignes par commande
    const map = {};
    rows.forEach(r => {
      if (!map[r.idCommande]) {
        map[r.idCommande] = {
          id: "DS-" + r.idCommande,
          date: new Date(r.dateCommande).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }),
          status: r.statut,
          total: r.montantTotal,
          items: []
        };
      }
      map[r.idCommande].items.push({
        name: r.nomProduit,
        qty: r.quantite,
        price: r.prixUnitaire
      });
    });
    res.json({ success: true, orders: Object.values(map) });
  });
});

/* =========================
   SAVE ORDER
========================= */
app.post("/api/orders", (req, res) => {
  const { idClient, adresseLivraison, wilaya, montantTotal, items, typePaiement } = req.body;
  const sqlCmd = `
    INSERT INTO commande (statut, adresseLivraison, wilaya, montantTotal, idClient)
    VALUES ('en préparation', ?, ?, ?, ?)
  `;
  db.query(sqlCmd, [adresseLivraison, wilaya, montantTotal, idClient], (err, result) => {
    if (err) return res.json({ success: false, message: "Erreur création commande" });
    const idCommande = result.insertId;
    // Insérer les lignes de commande
    const lignes = items.map(i => [idCommande, i.idProduit, i.quantite, i.prix]);
    db.query("INSERT INTO lignecommande (idCommande, idProduit, quantite, prixUnitaire) VALUES ?", [lignes], (err2) => {
      if (err2) return res.json({ success: false, message: "Erreur lignes commande" });
      // Insérer le paiement
      db.query(
        "INSERT INTO paiement (typePaiement, montant, datePaiement, statut, idCommande) VALUES (?, ?, NOW(), 'en attente', ?)",
        [typePaiement, montantTotal, idCommande],
        (err3) => {
          if (err3) return res.json({ success: false });
          // Mettre à jour les points de fidélité
          const pts = Math.floor(montantTotal / 1000);
          db.query(
            `INSERT INTO comptefidelite (pointsTotal, dateMAJ, idClient, idNiveau)
             VALUES (?, NOW(), ?, 1)
             ON DUPLICATE KEY UPDATE pointsTotal = pointsTotal + ?, dateMAJ = NOW()`,
            [pts, idClient, pts],
            () => res.json({ success: true, idCommande: "DS-" + idCommande })
          );
        }
      );
    });
  });
});




















/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});