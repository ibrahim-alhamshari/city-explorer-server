const { request, response } = require('express');
const { Digimon } = require('../model/Digimon.model');


const addFavoriteHandler = async (request, response) => {
    const { title, thumbnail, artist_display, description } = request.body;
    console.log(request.body);
    const slug = title.toLowerCase().split(' ').join('-');
    //'Hello World' ==> 'hello world' ==>['hello' 'world'] => hello-world

    Digimon.find({ title: title }, (err, userData) => {
        console.log(userData , err);
        if (userData.length>0) {
            response.send('Data aready exists');
        } else {
            const newDigimon = new Digimon({
                title: title,
                slug:slug,
                thumbnail: thumbnail,
                artist_display: artist_display,
                description: description
            })
    newDigimon.save();
    response.send(newDigimon);
        }
    })
}



const getFavoriteHandler = async (req, res) => {
    Digimon.find({}, (err, userData) => {
        if (err) {
            res.send(err);
        } else {
            res.send(userData);
    }
})
}

const updateFavoriteHandler = async (req, res) => {
    const { title, thumbnail, artist_display, description } = req.body;
    const slug = req.params.slug;
    Digimon.find({ slug: slug }, (err, userData) => {
        if (err) {
            res.send(err);
        } else {
            userData[0].title = title;
            userData[0].thumbnail = thumbnail;
 
            userData[0].save();
            res.send(userData);
        }
    })
}


const deleteFavoriteHandler = async (req, res) => {
    const slug = req.params.slug;
    Digimon.remove({ slug: slug }, (err, userData) => {
        if (err) {
            res.send(err);
        } else {
         
            res.send(userData);
        }
    })

}

module.exports = { getFavoriteHandler, addFavoriteHandler, updateFavoriteHandler, deleteFavoriteHandler }