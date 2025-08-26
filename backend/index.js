import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

// --- Configuration de Multer pour les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use("/uploads", express.static("uploads"));

// --- Fonction pour créer l'utilisateur Admin au démarrage du serveur ---
async function createAdminUser() {
  const codePin = "8882";
  const password = "Miky2003";

  // Le mot de passe haché est une nécessité pour la sécurité
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { codePin },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        codePin,
        password: hashedPassword,
      },
    });
    console.log("Utilisateur admin créé avec succès !");
  } else {
    console.log("L'utilisateur admin existe déjà.");
  }
}
createAdminUser();

// --- Middleware pour vérifier le token sur les routes sécurisées
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // Si pas de token, renvoyer une erreur 401 Unauthorized
    return res.sendStatus(401); 
  }

  jwt.verify(token, process.env.JWT_SECRET || "votre_clé_secrète_très_forte", (err, user) => {
    if (err) {
      // Si le token est invalide, renvoyer une erreur 403 Forbidden
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// --- Routes publiques et utilitaires ---
app.get("/", (req, res) => {
  res.send("Serveur portfolio en marche");
});

app.get("/api/projets", async (req, res) => {
  try {
    const projets = await prisma.projet.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// --- Route de connexion (utilise express.json()) ---
app.post("/api/login", express.json(), async (req, res) => {
  try {
    const { codePin, password } = req.body;
    if (!codePin || !password) {
      return res.status(400).json({ error: "Code PIN et mot de passe requis." });
    }

    const admin = await prisma.admin.findUnique({
      where: { codePin },
    });

    if (!admin) {
      return res.status(401).json({ error: "Code PIN ou mot de passe incorrect." });
    }

    // Comparaison du mot de passe haché
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Code PIN ou mot de passe incorrect." });
    }

    // Si les identifiants sont corrects, générer et renvoyer le token
    const token = jwt.sign(
      { id: admin.id, codePin: admin.codePin },
      process.env.JWT_SECRET || "votre_clé_secrète_très_forte",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Connexion réussie !", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
});

// --- Routes sécurisées (utilisent le middleware d'authentification) ---
app.post("/api/projets", upload.single("imageFile"), authenticateToken, async (req, res) => {
  try {
    const { titre, description, link, enCours } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const enCoursBoolean = enCours === "true";

    const newProjet = await prisma.projet.create({
      data: {
        titre,
        description,
        image: imagePath,
        link,
        enCours: enCoursBoolean,
      },
    });
    res.status(201).json(newProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur création projet" });
  }
});

app.put("/api/projets/:id", upload.single("imageFile"), authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titre, description, link, enCours } = req.body;
    const enCoursBoolean = enCours === "true";

    const dataToUpdate = { titre, description, link, enCours: enCoursBoolean };
    if (req.file) {
      dataToUpdate.image = `/uploads/${req.file.filename}`;
    }

    const updatedProjet = await prisma.projet.update({
      where: { id },
      data: dataToUpdate,
    });
    res.json(updatedProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur modification projet" });
  }
});

app.delete("/api/projets/:id", authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.projet.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur suppression projet" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));