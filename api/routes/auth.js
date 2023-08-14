const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    //console.log(err);
    res.status(500).json(err);
  }
});





router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "L'utilisateur n'existe pas" });
    }

    // Vérifier si le mot de passe est correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe ou email incorrect' });
    }

    // Générer un token d'authentification
    const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });

    // Envoyer le token en réponse
    res.status(200).json({user, token, message: 'Authentification réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


module.exports = router;
