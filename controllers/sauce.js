const Sauce = require('../models/sauce');
// fs = file-system, allow us to modify or delete a file
const fs = require('fs');



// CREATE SAUCE
exports.createSauce = (req, res, next) => {
  // body parse into object
  const sauceObject = JSON.parse(req.body.sauce);
  // delete id from frontend
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    // spread operator "..." allow us to copy an array
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save() //save sauce into database
    .then(() => res.status(201).json({ message: "La sauce a bien été créée !" }))
    .catch(error => res.status(400).json({ error }));
  console.log("voici la bonne sauce créée", sauce);
};


// DISPLAY ONE SAUCE
exports.getOneSauce = (req, res, next) => {
  console.log(req.params.id);
  Sauce.findOne({ _id: req.params.id })//get an element by its id
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(400).json({error}));
}


// DISPLAY ALL SAUCES
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }));
};



// MODIFIY SAUCE
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};


// DELETE SAUCE
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

