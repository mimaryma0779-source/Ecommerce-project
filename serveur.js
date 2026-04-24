const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

/* =========================
   MIDDLEWARE (IMPORTANT)
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* =========================
   DB
========================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "digital_store_db"
});

const ADMIN_DATA_KEYS = [
  "products",
  "users",
  "orders",
  "reviews",
  "categories",
  "criteria",
  "deliveries",
  "reco"
];
const adminSessions = new Map();
const DEFAULT_ADMIN_EMAIL = "admin@digitalstore.dz";
const DEFAULT_ADMIN_PASSWORD = "admin123";

const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });

function createAdminToken(email) {
  const token = crypto.randomBytes(24).toString("hex");
  adminSessions.set(token, { email, createdAt: Date.now() });
  return token;
}

function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";
  if (!token || !adminSessions.has(token)) {
    return res.status(401).json({ success: false, message: "Session admin invalide" });
  }
  req.adminSession = adminSessions.get(token);
  next();
}

async function ensureAdminStorage() {
  const sql = `
    CREATE TABLE IF NOT EXISTS admin_state (
      state_key VARCHAR(100) PRIMARY KEY,
      state_value LONGTEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await query(sql);
}

db.connect(async (err) => {
  if (err) {
    console.log("❌ DB error:", err);
    return;
  }
  console.log("✅ MySQL connected");
  try {
    await ensureAdminStorage();
    console.log("✅ Admin storage ready");
  } catch (storageErr) {
    console.log("❌ Admin storage error:", storageErr);
  }
});

/* =========================
   FRONTEND
========================= */
const FRONTEND_CANDIDATES = [
  
  path.join(__dirname, "..", "Ecommerce-project", "FrontEnd")
];
const FRONTEND_DIR = FRONTEND_CANDIDATES.find((dir) => fs.existsSync(dir));

if (FRONTEND_DIR) {
  app.use(express.static(FRONTEND_DIR));
}
app.use(express.static(path.resolve(__dirname, "..")));

app.get("/", (req, res) => {
  if (!FRONTEND_DIR) {
    return res.status(500).send("Dossier FrontEnd introuvable");
  }
  res.sendFile(path.join(FRONTEND_DIR, "FenetreDemarage.HTML"));
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
   ADMIN AUTH + DATA API
========================= */
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Champs manquants" });
  }

  if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
    const token = createAdminToken(email);
    return res.json({
      success: true,
      user: { id: 0, nom: "Admin", prenom: "Demo", email },
      token
    });
  }

  return res.status(401).json({ success: false, message: "Identifiants admin invalides" });
});

app.get("/api/admin/data", requireAdminAuth, async (req, res) => {
  try {
    const rows = await query(
      "SELECT state_key, state_value FROM admin_state WHERE state_key IN (?)",
      [ADMIN_DATA_KEYS]
    );

    const data = {};
    for (const row of rows) {
      try {
        data[row.state_key] = JSON.parse(row.state_value);
      } catch {
        data[row.state_key] = row.state_value;
      }
    }

    res.json({ success: true, data });
  } catch (error) {
    console.log("Admin data load error:", error);
    res.status(500).json({ success: false, message: "Erreur chargement admin" });
  }
});

app.put("/api/admin/data/:key", requireAdminAuth, async (req, res) => {
  const { key } = req.params;
  if (!ADMIN_DATA_KEYS.includes(key)) {
    return res.status(400).json({ success: false, message: "Cle inconnue" });
  }

  try {
    const payload = JSON.stringify(req.body?.value ?? null);
    await query(
      `INSERT INTO admin_state (state_key, state_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE state_value = VALUES(state_value), updated_at = CURRENT_TIMESTAMP`,
      [key, payload]
    );

    res.json({ success: true });
  } catch (error) {
    console.log("Admin data save error:", error);
    res.status(500).json({ success: false, message: "Erreur sauvegarde admin" });
  }
});




















/* =========================
   START SERVER
========================= */
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
