const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create geolocation Schema
const GeoSchema = new Schema({

    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})




//Create ninja schemma
const NinjaSchemma = new Schema({

    name: {
        type: String,
        required: [true, 'Name filed is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema //todo: find out if it is compulsory to use the word "geometry"

});

/**result should be like:
 * {
    name: "femi",
    "rank": "5",
    available: true,
    geometry: {
        type: "Point",
        coordinates: [23, 5]
    }
}*/

/**
 * This is going to create a collection of NINJA (i.e model)
 * 
 * ninja is the name of table/collection
 */
const Ninja = mongoose.model('ninja', NinjaSchemma);

module.exports = Ninja;