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
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
  });

  sauce.save() //save sauce into database
    .then(() => res.status(201).json({ message: "La sauce a bien été créée !" }))
    .catch(error => res.status(400).json({ error }));
  console.log("voici la bonne sauce créée", sauce);
};


// DISPLAY ONE SAUCE
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    }
    );
};


// DISPLAY ALL SAUCES
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }));
};


// MODIFY SAUCES
exports.modifySauce = (req, res, next) => {

  // if we change the image, old one will be deleted
  if(req.file){
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split("/images")[1];
      // delete old image
      fs.unlink(`images/${filename}`, (err) => {
        if(err) throw err;
      })
    })
    .catch(error => res.status(400).json({error}));  
  }else{};

  // object that will be sent into database
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } :
  { ...req.body};

  //database update
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //2 parameters : the object and the new object version
    .then(() => res.status(200).json({ message: "objet mise à jour" }))
    .catch((error) => res.status(404).json({ error }));
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


// LIKES
exports.likes = (req, res, next) => {  
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {      

      //like = +1 (like +1)
      if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 1) ) {
        console.log("ok like +1");
        Sauce.updateOne({ _id: req.params.id }, { $inc: {likes : 1}, $push: { usersLiked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce +1 like" }))
        .catch((error) => {res.status(400).json({ error })});
      };     
      
      //like = 0 (for sauces that have been liked)
      if((sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 0) ) {
        console.log("ok like = 0");
        Sauce.updateOne({_id: req.params.id}, { $inc: {likes: -1}, $pull: {usersLiked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce 0 like" }))
        .catch((error) => {res.status(400).json({ error })});
      }

     //like = -1 (dislike = +1)
     if((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == -1) ) {
      console.log("ok dislike +1");
      Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes : 1}, $push: { usersDisliked : req.body.userId}, _id: req.params.id})
      .then(() => res.status(201).json({ message: "sauce +1 dislike" }))
      .catch((error) => {res.status(400).json({ error })});
      };  

      //dislike = 0 (for sauces that have been disliked)
      if((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == 0) ) {
        console.log("ok dislike = 0");
        Sauce.updateOne({_id: req.params.id}, { $inc: {dislikes: -1}, $pull: {usersDisliked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce 0 like" }))
        .catch((error) => {res.status(400).json({ error })});
      }   
  })  
  .catch((error) => res.status(404).json({error}));
};
