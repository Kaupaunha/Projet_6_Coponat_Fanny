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

module.exports = pwdSchema;