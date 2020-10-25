const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const router = require('./authRoutes');

const Track = mongoose.model('Track');

router.use(requireAuth);

router.get('/tracks' , async () => {
    const tracks = await Track.find({
        userId: req.user._id
    });

    res.send(tracks);
});


router.post('/tracks' , async (req, res) => {
    const { name, locations } = req.body;

    if(!name || !locations)
        return res.status(422).send({ error: 'You must provide name & locations '});
    try{
        const track = new Track({ name , locations, userId: req.user._id });

        await track.save();
        res.send(track);
    } catch(err) {
        return res.status(422).send({ error: 'You must provide name & locations '});
    }

});

module.exports = router;