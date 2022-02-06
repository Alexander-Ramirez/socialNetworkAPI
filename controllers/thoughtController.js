const { Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
          .sort({ createdAt: -1 })
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
          .select("-__v")
          .then((dbThoughtData) =>
            !dbThoughtData
            ? res.status(404).json({ message: "No thought with that Id" })
            : res.json({ dbThoughtData }))

          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      }, 

      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
      },

      updateThoughts(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true })
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: "No thoughts with this ID" })
              : res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((dbUserData) =>
            !dbUserData
              ? res.status(404).json({ message: "No thought found with that Id" })
              : res.json(dbUserData)
          )
          .catch((err) => res.status(500).json(err));
      },
      createReaction(req, res) {
        const filter = { _id: req.params.thoughtId };  
        const update = { $addToSet: { reactions: req.body } };
        Thought.findOneAndUpdate(filter, update, { runValidators: true, new: true})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
        },
  
      deleteReaction(req, res) {
        const filter = { _id: req.params.thoughtId };  
        const update = { $pull: { reactions: req.params.reactionId } };
        Thought.findOneAndUpdate(filter, update, { runValidators: true, new: true})
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(500).json(err));
        },
};

module.exports = thoughtController