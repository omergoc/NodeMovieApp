const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MovieSchema = new Schema({
    director_id : ObjectId,
    title:{
        type: String,
        required:[true,'']
    },
    category: String,
    country:String,
    year: Number,
    imdb_score:Number,
    date: {
        type:Date,
        default: Date.now
    }
});

module.exports=mongoose.model('moview',MovieSchema);