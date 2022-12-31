// to control what kind of password we accept
const pwdValidator = require("password-validator");

const pwdSchema = new pwdValidator();
pwdSchema
  .is().min(8) 
  .is().max(15) 
  .has().uppercase() 
  .has().lowercase() 
  .has().digits() 
  .has().not().spaces()
  .has().not().symbols();

module.exports = (req, res, next) => {
  // si false
  if (!pwdSchema.validate(req.body.password)) {
    res.status(400).json({message: "Mot de passe non valide: min 8 caractères, une majuscule, une minuscule et un chiffre, sans espace, pas de caractères spéciaux."})
  } else {
    next();
  }
};







