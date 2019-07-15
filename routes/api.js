const express = require('express');
const Ninja = require('../models/ninja');

const router = express.Router(); //Router() is an interface in the express file

/**
 * This is how to make get, post, put, delete
 * 
 * the call-back function has request and response
 * The res.end, res.send({name: 'femi'});
 */

//get a list of ninjas from the db
router.get('/ninjas',  function (req, res, next) {

    /**
     * Get all ninjas
     * 
     * Ninja.find({}).then(function(ninja){
        res.send(ninja);
    })
     */

     Ninja.geoNear({
         type: 'Point',
         coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
     },
     {
         maxDistance: 100000, 
         spherical: true
     }
     ).then(function(ninjas){
         res.send(ninjas);
     });
    
});

//add a new ninja to the db
//next is like what happens after this method is executed
router.post('/ninjas',  function (req, res, next) {

    //var ninja = new Ninja(req.body);
    //ninja.save();
            //OR
    Ninja.create(req.body).then(function (ninja) {
        
        res.send(ninja);
    }).catch(next); //if failed, catch(next) Go into the next  middleware

    /*res.send({
        type: 'POST',
        name: req.body.name,
        rank: req.body.rank
    });
    */
});


//update a ninja in the db
router.put('/ninjas/:id',  function (req, res, next) {
    
    Ninja.findByIdAndUpdate({_id: req.params._id}, req.body).then(function(){
        Ninja.findOne({_id: req.params._id}).then(function(){

            res.send(ninja);
        });
       
    });
});

//delete a ninja from the db
router.delete('/ninjas/:id',  function (req, res, next) {
    
    Ninja.findByIdAndRemove({_id: req.params._id}).then(function(ninja){
        res.send(ninja);
    });

});

module.exports = router;