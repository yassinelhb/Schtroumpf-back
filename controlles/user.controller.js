const User = require("../models/user.model");

const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
};

module.exports.getUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Aucun enregistrement avec l'identifiant donné ${req.params.id}`);

  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Aucun enregistrement avec l'identifiant donné ${req.params.id}`);

  var user = {
    age: req.body.age,
    famille: req.body.famille,
    race: req.body.race,
    nourriture: req.body.nourriture,
  };

  User.findByIdAndUpdate(
    req.params.id,
    { $set: user },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        res.status(500).send(err);
      }
    }
  );
};

module.exports.follow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Aucun enregistrement avec l'identifiant donné ${req.params.id}`);

  if (!ObjectId.isValid(req.body.friendId))
    return res
      .status(400)
      .send(
        `Aucun enregistrement avec l'identifiant donné ${req.body.friendId}`
      );

  User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { friends: req.body.friendId } },
    { new: true, upsert: true },
    async (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        res.status(500).send("Erreur dans le suivi de l'utilisateur");
      }
    }
  );
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Aucun enregistrement avec l'identifiant donné ${req.params.id}`);

  if (!ObjectId.isValid(req.body.friendId))
    return res
      .status(400)
      .send(
        `Aucun enregistrement avec l'identifiant donné ${req.body.friendId}`
      );

  User.findByIdAndUpdate(
    req.params.id,
    { $pull: { friends: req.body.friendId } },
    { new: true, upsert: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        res.status(500).send("Erreur dans le suivi de l'utilisateur");
      }
    }
  );
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send(`Aucun enregistrement avec l'identifiant donné ${req.params.id}`);

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.status(500).send("Erreur lors de la suppression de l'utilisateur");
    }
  });
};
