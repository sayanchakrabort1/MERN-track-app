const { response } = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (request, reponse, next) => {
    const { authorization } = request.headers;
    // authorization === 'Bearer sjadjsjajdsa'

    if(!authorization)
        return response.status(401).send({ error: 'Forbidden '});

    const token = authorization.replace('Bearer ','');

    jwt.verify(token, 'MY_SECRET_KEY', async (err,payload) => {
        if(err)
            return response.status(401).send({ error: 'Forbidden '});

        const { userId } = payload;
        
        const user = await User.findById(userId);
        request.user = user;
        next();
    });
};