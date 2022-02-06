const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {
      User.find()
        .select("-__v")
        .then((users) => res.json(users))
        .catch((err) => {
          res.status(500).json(err);
          console.log(err);
        })
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
          .select("-__v")
          .populate("thoughts")
          .populate("friends")
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user with that ID" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },

      updateUser(req, res) {
        User.findOneAndUpdate(
          { id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user with this ID." });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },

      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user with this ID!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.json(err));
      },

      addFriend(req, res) {
        const filter = { _id: req.params.userId };  
        const update = { $addToSet: { friends: req.params.friendId }}
        User.findOneAndUpdate( filter, update, { runValidators: true, new: true })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err))
      },
    
      deleteFriend(req, res) {
        const filter = { _id: req.params.userId };  
        const update = { $pull: { friends: req.params.friendId }}
        User.findOneAndDelete( filter, update, { runValidators: true, new: true })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;