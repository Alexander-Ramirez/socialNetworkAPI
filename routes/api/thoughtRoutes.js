const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtById).put(updateThoughts).delete(deleteThoughts);

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions').delete(deleteReaction);
